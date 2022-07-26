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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AddCompleteComponent } from './components/card/add-complete/add-complete.component';
import { AddComponent } from './pages/add/add.component';
import { CityInputComponent } from './components/input/city-input/city-input.component';
import { CountryInputComponent } from './components/input/country-input/country-input.component';
import { DefaultsCardComponent } from './components/card/defaults-card/defaults-card.component';
import { DefaultsComponent } from './pages/defaults/defaults.component';
import { DeviceComponent } from '@account/app/modules/device/device.component';
import { DeviceEditCardComponent } from './components/card/device-edit-card/device-edit-card.component';
import { DeviceEditComponent } from './pages/device-edit/device-edit.component';
import { DeviceDisplayComponent } from './components/card/device-display/device-display.component';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceService } from '@account/http/device.service';
import { GeographyCardComponent } from './components/card/geography-card/geography-card.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { RegionInputComponent } from './components/input/region-input/region-input.component';
import { RemoveDeviceDialogComponent } from './components/modal/remove-device-dialog/remove-device-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { SshCardComponent } from './components/card/ssh-card/ssh-card.component';
import { TimezoneInputComponent } from './components/input/timezone-input/timezone-input.component';
import { PreferencesCardComponent } from './components/card/preferences-card/preferences-card.component';
import { VoiceCardComponent } from './components/card/voice-card/voice-card.component';
import { WakeWordCardComponent } from './components/card/wake-word-card/wake-word-card.component';
import { SoftwareUpdateCardComponent } from './components/card/software-update-card/software-update-card.component';
import { SoftwareReleaseCardComponent } from './components/card/software-release-card/software-release-card.component';

@NgModule({
    declarations: [
        AddCompleteComponent,
        AddComponent,
        CityInputComponent,
        CountryInputComponent,
        DefaultsCardComponent,
        DefaultsComponent,
        DeviceComponent,
        DeviceEditCardComponent,
        DeviceEditComponent,
        DeviceDisplayComponent,
        DeviceListComponent,
        GeographyCardComponent,
        PreferencesCardComponent,
        PreferencesComponent,
        RegionInputComponent,
        RemoveDeviceDialogComponent,
        SshCardComponent,
        TimezoneInputComponent,
        VoiceCardComponent,
        WakeWordCardComponent,
        SoftwareUpdateCardComponent,
        SoftwareReleaseCardComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        SharedModule,
        DeviceRoutingModule
    ],
    providers: [
        DeviceService
    ]
})
export class DeviceModule { }
