import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import {
    Skill,
    SkillService,
} from './skill.service';
import { Observable } from 'rxjs';

export interface WebApps {
    account: string;
    chat: string;
    forum: string;
    marketplace: string;
    mimic: string;
    singleSignOn: string;
    translate: string;
    wordPress: string;
}

@Component({
  selector: 'account-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
    public helpText: string;
    public marketplaceLink: string;
    public moreSkillsText: string;
    public mycroftUrls: WebApps = environment.mycroftUrls;
    public skills$: Observable<Skill[]>;
    public deviceCount: number;

    constructor(private skillService: SkillService) {
    }

    ngOnInit() {
        this.defineAssistiveText();
        this.skills$ = this.skillService.getSkills();
        this.skillService.getDevices().subscribe(
            (result) => { this.deviceCount = result['deviceCount']; console.log(this.deviceCount); }
        );
    }


    private defineAssistiveText() {
        this.helpText = 'Select a skill below to update its settings, ' +
            'see more information about it, or remove it from your device(s).  ' +
            'The cog icons indicate a skills with settings to configure.';
        this.moreSkillsText = 'To add skills to your device(s), you can use voice commands ' +
            '(e.g. "Hey Mycroft, install alarm skill.") or ';
        this.marketplaceLink = 'visit our skill marketplace.';
    }
}
