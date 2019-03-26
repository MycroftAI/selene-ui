import { Component, Input, OnInit } from '@angular/core';

import { faCog } from '@fortawesome/free-solid-svg-icons';

import { Skill } from '../../core/http/skill.service';

@Component({
    selector: 'account-skill-panel',
    templateUrl: './skill-panel.component.html',
    styleUrls: ['./skill-panel.component.scss']
})
export class SkillPanelComponent implements OnInit {
    public settingsIcon = faCog;
    @Input() deviceCount: number;
    @Input() skill: Skill;
    public panelExpanded = false;

    constructor() {
    }

    ngOnInit() {
    }

    closePanel() {
        this.panelExpanded = false;
    }

}
