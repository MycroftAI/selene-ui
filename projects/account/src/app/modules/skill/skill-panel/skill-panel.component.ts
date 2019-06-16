import { Component, Input, OnInit } from '@angular/core';

import { faCog } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';
import { SkillFamily } from '@account/models/skill_family.model';

@Component({
    selector: 'account-skill-panel',
    templateUrl: './skill-panel.component.html',
    styleUrls: ['./skill-panel.component.scss']
})
export class SkillPanelComponent implements OnInit {
    public settingsIcon = faCog;
    @Input() deviceCount: number;
    @Input() skill: SkillFamily;
    public panelExpanded = false;
    public marketUrl = environment.mycroftUrls.marketplace + '/skills/';

    constructor() {
    }

    ngOnInit() {
    }

    closePanel() {
        this.panelExpanded = false;
    }
}
