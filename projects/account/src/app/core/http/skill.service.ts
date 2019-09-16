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
        console.log(skillSettings);
        return this.http.put(
            `/api/skills/${skillFamily.familyName}/settings`,
            {skillIds: skillFamily.skillIds, skillSettings: skillSettings}
        );
    }

    authenticateSkill(oauthId: string) {
        return this.http.get<OauthResponse>(skillOauthUrl + '/' + oauthId );
    }
}
