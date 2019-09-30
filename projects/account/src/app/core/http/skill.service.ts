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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SkillFamily } from '@account/models/skill_family.model';
import { SkillSettings } from '@account/models/skill-settings.model';

const accountSkillUrl = '/api/skills';
const accountDeviceCountUrl = '/api/device-count';
const skillOauthUrl = 'api/skills/oauth';

export interface OauthResponse {
    hasToken: boolean;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient) { }

    getDeviceCount(): Observable<any[]> {
        return this.http.get<any[]>(accountDeviceCountUrl);
    }

    getSkills(): Observable<SkillFamily[]> {
        return this.http.get<SkillFamily[]>(accountSkillUrl);
    }

    getSkillSettings(skillFamilyName: string): Observable<SkillSettings[]> {
        return this.http.get<SkillSettings[]>(`/api/skills/${skillFamilyName}/settings`);
    }

    updateSkillSettings(skillFamily: SkillFamily, skillSettings: SkillSettings[]) {
        return this.http.put(
            `/api/skills/${skillFamily.familyName}/settings`,
            {skillIds: skillFamily.skillIds, skillSettings: skillSettings}
        );
    }

    authenticateSkill(oauthId: string) {
        return this.http.get<OauthResponse>(skillOauthUrl + '/' + oauthId );
    }
}
