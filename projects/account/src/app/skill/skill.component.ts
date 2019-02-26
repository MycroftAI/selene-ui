import { Component, Input, OnInit } from '@angular/core';

import { faCog } from '@fortawesome/free-solid-svg-icons';

import { environment } from '../../environments/environment';
import { Skill, SkillService } from './skill.service';

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
    public duplicateSkills = false;
    public duplicateSkillText: string;
    public helpText: string;
    public marketplaceLink: string;
    public moreSkillsText: string;
    public mycroftUrls: WebApps = environment.mycroftUrls;
    public settingsIcon = faCog;
    public skills: Skill[];

    constructor(private skillService: SkillService) {
    }

    ngOnInit() {
        this.deineAssistiveText();
        this.skillService.getSkills().subscribe(
          (skills) => {
              this.skills = skills;
              this.checkForDuplicateSkills();
          }
        );
    }

    private deineAssistiveText() {
        this.helpText = 'Select a skill below to update its settings, ' +
            'see more information about it, or remove it from your device(s).  ' +
            'The cog icons indicate a skills with settings to configure.';
        this.duplicateSkillText = 'If a skill is listed more than once, you ' +
            'have devices with different versions of the skill\'s settings.  ' +
            'Select the skill to see a list of the devices using those settings.';
        this.moreSkillsText = 'To add skills to your device(s), you can use voice commands ' +
            '(e.g. "Hey Mycroft, install alarm skill.") or ';
        this.marketplaceLink = 'visit our skill marketplace.';
    }

    private checkForDuplicateSkills() {
        this.skills.forEach(
            (skill) => {
                if (skill.sections) {
                    this.checkForDeviceSection(skill.sections);
                }
            }
        );
    }

    private checkForDeviceSection(sections) {
        sections.forEach(
            (section) => {
                if (section.name === 'Devices') {
                    this.duplicateSkills = true;
                }
            }
        );
    }
}
