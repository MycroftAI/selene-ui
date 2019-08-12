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
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InstallButtonComponent } from './install-button/install-button.component';
import { InstallService } from './install.service';
import { MaterialModule } from '../shared/material.module';
import { SkillCardComponent } from './skill-summary/skill-card/skill-card.component';
import { SkillDetailBodyComponent } from './skill-detail/skill-detail-body/skill-detail-body.component';
import { SkillCardHeaderComponent } from './skill-summary/skill-card/skill-card-header.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { SkillDetailHeaderComponent } from './skill-detail/skill-detail-header/skill-detail-header.component';
import { SkillSearchComponent} from './skill-summary/skill-search/skill-search.component';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsService } from './skills.service';
import { SkillSummaryComponent } from './skill-summary/skill-summary.component';

@NgModule(
    {
        imports: [
            AngularFontAwesomeModule,
            CommonModule,
            FlexLayoutModule,
            FontAwesomeModule,
            FormsModule,
            MaterialModule,
            SkillsRoutingModule
        ],
        declarations: [
            SkillCardComponent,
            SkillCardHeaderComponent,
            SkillDetailComponent,
            SkillDetailBodyComponent,
            SkillDetailHeaderComponent,
            SkillSearchComponent,
            SkillSummaryComponent,
            InstallButtonComponent
        ],
        exports: [ SkillSummaryComponent, SkillDetailComponent ],
        entryComponents: [ SkillDetailComponent ],
        providers: [ InstallService, SkillsService ]
    }
)
export class SkillsModule { }
