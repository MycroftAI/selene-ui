import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SettingChange } from '@account/models/setting-change.model';
import { SettingSection } from '@account/models/setting-section.model';

@Component({
    selector: 'account-skill-setting-section',
    templateUrl: './setting-section.component.html',
    styleUrls: ['./setting-section.component.scss']
})
export class SettingSectionComponent implements OnInit {
    @Input() sectionDefinition: SettingSection;
    @Input() settingsValues: object;
    @Output() newValue = new EventEmitter<SettingChange>();
    @Output() skillOauth = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    onValueChange(newValue: SettingChange)  {
        this.newValue.emit(newValue);
    }

    onSkillOauth(oauthId: string) {
        this.skillOauth.emit(oauthId);
    }
}
