import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { SettingField } from '@account/models/setting-field.model';
import { SettingChange } from '@acount/models/setting-change.model';

@Component({
    selector: 'account-skill-setting-field',
    templateUrl: './setting-field.component.html',
    styleUrls: ['./setting-field.component.scss']
})
export class SettingFieldComponent implements OnInit {
    @Input() fieldDefinition: SettingField;
    @Input() settingsValues: object;
    @Output() newValue = new EventEmitter<SettingChange>();
    public fieldValue: string;

    constructor() { }

    ngOnInit() {
        this.fieldValue = this.settingsValues[this.fieldDefinition.name];
        if (!this.fieldValue) {
            this.fieldValue = this.fieldDefinition.value;
        }
    }

    onInputChange(changeEvent: Event) {
        const element = changeEvent.currentTarget as HTMLInputElement;
        this.newValue.emit(
            {name: this.fieldDefinition.name, value: element.value}
        );
    }

    onCheckboxChange(changeEvent: MatCheckboxChange) {
        this.newValue.emit(
            {name: this.fieldDefinition.name, value: changeEvent.checked.toString()}
        );
    }

    onSelectChange(newValue: string) {
        this.newValue.emit({name: this.fieldDefinition.name, value: newValue});
    }
}
