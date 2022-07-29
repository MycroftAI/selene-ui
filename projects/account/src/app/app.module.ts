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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GlobalnavModule } from 'globalnav';
import { DeviceModule } from './modules/device/device.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SharedModule as SharedLibModule } from 'shared';
import { SharedModule } from 'shared';
import { SkillModule } from './modules/skill/skill.module';
import { PersonalDataModule } from './modules/personal-data/personal-data.module';

@NgModule(
    {
        declarations: [ AppComponent ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            DashboardModule,
            GlobalnavModule,
            HttpClientModule,
            DeviceModule,
            PersonalDataModule,
            ProfileModule,
            SharedLibModule,
            SharedModule,
            SkillModule,
            AppRoutingModule
        ],
        bootstrap: [ AppComponent ]
    }
)
export class AppModule { }
