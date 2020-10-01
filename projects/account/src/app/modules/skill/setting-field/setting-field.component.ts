/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { SettingField } from '@account/models/setting-field.model';
import { SettingChange } from '@account/models/setting-change.model';

@Component({
    selector: 'account-skill-setting-field',
    templateUrl: './setting-field.component.html',
    styleUrls: ['./setting-field.component.scss']
})
export class SettingFieldComponent implements OnInit {
    @Input() fieldDefinition: SettingField;
    @Input() settingsValues: any;
    @Output() newValue = new EventEmitter<SettingChange>();
    @Output() skillAuthentication = new EventEmitter<string>();
    public fieldValue: string | boolean | number;

    constructor() { }

    ngOnInit() {
        if (this.settingsValues) {
            this.fieldValue = this.settingsValues[this.fieldDefinition.name];
            if (!this.fieldValue) {
                this.fieldValue = this.fieldDefinition.value;
            }
        }
    }

    onTextChange(changeEvent: Event) {
        const element = changeEvent.currentTarget as HTMLInputElement;
        this.newValue.emit(
            {name: this.fieldDefinition.name, value: element.value}
        );
    }

    onNumberChange(changeEvent: Event) {
        const element = changeEvent.currentTarget as HTMLInputElement;
        this.newValue.emit(
            {name: this.fieldDefinition.name, value: Number(element.value)}
        );
    }

    onCheckboxChange(changeEvent: MatCheckboxChange) {
        this.newValue.emit(
            {name: this.fieldDefinition.name, value: changeEvent.checked}
        );
    }

    onSelectChange(newValue: string) {
        this.newValue.emit({name: this.fieldDefinition.name, value: newValue});
    }

    /**
     * An oauth button must have an ID in its value to pass to the oauth service.
     */
    onSkillOauth() {
        this.skillAuthentication.emit(this.settingsValues[this.fieldDefinition.name]);
    }
}
