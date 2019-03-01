import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SettingChange, SettingSection } from '../skill.service';

@Component({
    selector: 'account-skill-setting-section',
    templateUrl: './setting-section.component.html',
    styleUrls: ['./setting-section.component.scss']
})
export class SettingSectionComponent implements OnInit {
    @Input() sectionDefinition: SettingSection;
    @Input() settingsValues: object;
    @Output() newValue = new EventEmitter<SettingChange>();

    constructor() {
    }

    ngOnInit() {
    }

    onValueChange(newValue: SettingChange)  {
        this.newValue.emit(newValue);
    }
}
