import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const accountSkillUrl = '/api/skill';

export interface SelectOptions {
    display: string;
    value: string;
}
export interface Setting {
    type: string;
    label: string;
    options?: SelectOptions[];
    value?: string;
}

export interface SettingSection {
    name: string;
    settings: Setting[];
}

export interface Skill {
    name: string;
    sections?: SettingSection[];
}

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient) { }

    getSkills() {
        return this.http.get<Skill[]>(accountSkillUrl);
    }
}
