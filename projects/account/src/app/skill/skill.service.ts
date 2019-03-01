import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const accountSkillUrl = '/api/skills';
const accountDeviceCountUrl = '/api/device-count';

export interface SelectOptions {
    display: string;
    value: string;
}
export interface Skill {
    id: string;
    name: string;
    hasSettings: boolean;
}

export interface SettingField {
    name: string;
    type: string;
    label: string;
    options?: SelectOptions[];
    value?: string;
}

export interface SettingSection {
    name: string;
    fields: SettingField[];
}

export interface SettingsDefinition {
    sections: SettingSection[];
}
export interface SkillSettings {
    settingsDefinition: SettingsDefinition;
    settingsValues: any;
    devices: string[];
}

export interface SettingChange {
    name: string;
    value: string;
}

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
