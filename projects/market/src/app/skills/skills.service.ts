/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';

export interface AvailableSkills {
    skills: AvailableSkill[];
}
export interface AvailableSkill {
    displayName: string;
    icon: Object;
    iconImage: string;
    isMycroftMade: boolean;
    isSystemSkill: boolean;
    marketCategory: string;
    id: string;
    summary: string;
    trigger: string;
}

export interface SkillCredits {
    name: string;
    github_id: string;
}

export interface Icon {
    icon: string;
    color: string;
}

export interface SkillDetail {
    displayName: string;
    categories: string[];
    credits: SkillCredits[];
    description: string;
    icon: Icon;
    iconImage: string;
    isSystemSkill: boolean;
    id: string;
    repositoryUrl: string;
    summary: string;
    triggers: string;
    worksOnKDE: boolean;
    worksOnMarkOne: boolean;
    worksOnMarkTwo: boolean;
    worksOnPicroft: boolean;
}

const availableSkillsUrl = '/api/skills/available';
const skillUrl = '/api/skills/';
const searchQuery = '?search=';

@Injectable()
export class SkillsService {
    public availableSkills: AvailableSkill[];
    public isFiltered = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    /**
     * API call to retrieve all the skills available to the user
     */
    getAvailableSkills(): Observable<AvailableSkills> {
        return this.http.get<AvailableSkills>(availableSkillsUrl).pipe(
            tap((response) => { this.availableSkills = response.skills; })
        );
    }

    /**
     * Loop through the available skills to build a list of distinct categories.
     */
    getSkillCategories(): string[] {
        const orderedSkillCategories: string[] = [];
        const skillCategories: string[] = [];
        let systemCategoryFound = false;
        this.availableSkills.forEach(
            (skill) => {
                if (!skillCategories.includes(skill.marketCategory)) {
                    skillCategories.push(skill.marketCategory);
                }
            }
        );
        skillCategories.sort();

        // Make the 'System' category display last, if it exists
        skillCategories.forEach(
            category => {
                if (category === 'System') {
                    systemCategoryFound = true;
                } else {
                    orderedSkillCategories.push(category);
                }
            }
        );
        if (systemCategoryFound) {
            orderedSkillCategories.push('System');
        }

        return orderedSkillCategories;
    }

    /**
     * API call to retrieve detailed information about a specified skill.
     *
     * @param skillId: ID    of the skill to retrieve
     */
    getSkillById(skillId: string): Observable<SkillDetail> {
        return this.http.get<SkillDetail>(skillUrl + skillId);
    }

    /**
     *  API call to retrieve available skills that match the specified search term.
     *
     * @param searchTerm string used to search skills
     */
    searchSkills(searchTerm: string): Observable<AvailableSkills> {
        this.isFiltered.next(!!searchTerm);
        return this.http.get<AvailableSkills>(availableSkillsUrl  + searchQuery + searchTerm).pipe(
            tap((response) => { this.availableSkills = response.skills; })
        );
    }
}
