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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SkillSettingsComponent } from './skill-setting/skill-settings.component';
import { SkillComponent } from './skill.component';
import { SettingFieldComponent } from './setting-field/setting-field.component';
import { SettingSectionComponent } from './setting-section/setting-section.component';
import { SkillPanelComponent } from './skill-panel/skill-panel.component';
import { SkillRoutingModule } from './skill-routing.module';
import { SharedModule } from 'shared';

@NgModule({
    declarations: [
        SkillSettingsComponent,
        SkillComponent,
        SettingFieldComponent,
        SettingSectionComponent,
        SkillPanelComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        SharedModule,
        SkillRoutingModule
    ]
})
export class SkillModule { }
