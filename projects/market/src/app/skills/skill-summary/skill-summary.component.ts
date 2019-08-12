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

import { Component, OnInit } from '@angular/core';

import { SkillsService, AvailableSkill } from '../skills.service';
import { InstallService } from '../install.service';

@Component({
    selector: 'market-skill-summary',
    templateUrl: './skill-summary.component.html',
    styleUrls: ['./skill-summary.component.scss'],
})
export class SkillSummaryComponent implements OnInit {
    public skillCategories: string[];
    public availableSkills: AvailableSkill[];


    constructor(
        private installService: InstallService,
        private skillsService: SkillsService,
    ) { }

    ngOnInit() {
        this.getAvailableSkills();
    }

    /** Issue and API call to retrieve all the available skills. */
    getAvailableSkills(): void {
        this.skillsService.getAvailableSkills().subscribe(
            (skills) => {
                this.availableSkills = skills;
                this.skillCategories = this.skillsService.getSkillCategories();
                this.installService.getSkillInstallations();
            }
        );
    }

    /** Skills are displayed by category; this function will do the filtering */
    filterSkillsByCategory(category: string): AvailableSkill[] {
        return this.availableSkills.filter(
            (skill) => skill.marketCategory === category
        );
    }

    /** Change the view to display only those matching the search criteria. */
    showSearchResults(searchResults): void {
        this.availableSkills = searchResults;
        this.skillCategories = this.skillsService.getSkillCategories();
    }

}
