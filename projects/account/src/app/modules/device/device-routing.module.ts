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
import { RouterModule, Routes } from '@angular/router';

import { DefaultsResolverService } from '../../core/guards/defaults-resolver.service';
import { AddComponent } from './pages/add/add.component';
import { DeviceComponent } from './device.component';
import { DefaultsComponent } from '@account/app/modules/device/pages/defaults/defaults.component';
import { DeviceEditComponent } from '@account/app/modules/device/pages/device-edit/device-edit.component';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DeviceResolverService } from '../../core/guards/device-resolver.service';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { PreferencesResolverService } from '../../core/guards/preferences-resolver.service';

const deviceRoutes: Routes = [
    {
        path: 'devices',
        component: DeviceComponent,
        children: [
            {
                path: '',
                component: DeviceListComponent,
                resolve: {
                    devices: DeviceResolverService,
                }
            },
            {
                path: 'preferences',
                component: PreferencesComponent,
                resolve: {
                    preferences: PreferencesResolverService,
                }
            },
            {
                path: 'defaults',
                component: DefaultsComponent,
                resolve: {
                    defaults: DefaultsResolverService
                }
            },
        ]
    },
    {
        path: 'devices/add',
        component: AddComponent,
        resolve: {
            defaults: DefaultsResolverService,
            preferences: PreferencesResolverService
        }
    },
    {
        path: 'devices/:deviceId',
        component: DeviceEditComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(deviceRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DeviceRoutingModule { }
