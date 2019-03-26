import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Skill } from '@account/models/skill.model';
import { SkillSettings } from '@account/models/skill-settings.model';

const accountSkillUrl = '/api/skills';
const accountDeviceCountUrl = '/api/device-count';


@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient) { }

    getDeviceCount(): Observable<any[]> {
        return this.http.get<any[]>(accountDeviceCountUrl);
    }

    getSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(accountSkillUrl);
    }

    getSkillSettings(skillId: string): Observable<SkillSettings[]> {
        return this.http.get<SkillSettings[]>(`/api/skills/${skillId}/settings`);
    }

    updateSkillSettings(skillId: string, skillSettings: SkillSettings[]) {
        this.http.put(
            `/api/skills/${skillId}/settings`,
            {skillSettings: skillSettings}
        ).subscribe(
            (response) => { console.log(response); }
        );
    }

}
