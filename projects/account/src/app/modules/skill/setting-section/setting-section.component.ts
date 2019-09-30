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
