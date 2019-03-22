import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceService } from '@account/http/device.service';
import { PreferencesComponent } from './components/view/preferences/preferences.component';
import { RemoveComponent } from './remove/remove.component';
import { SharedModule } from '../../shared/shared.module';
import { DeviceAddComponent } from './pages/device-add/device-add.component';
import { DeviceListComponent } from './components/view/device-list/device-list.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { CityInputComponent } from './components/input/city-input/city-input.component';
import { CountryInputComponent } from './components/input/country-input/country-input.component';
import { RegionInputComponent } from './components/input/region-input/region-input.component';
import { TimezoneInputComponent } from './components/input/timezone-input/timezone-input.component';
import { AddCompleteComponent } from './components/view/add-complete/add-complete.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DeviceInfoComponent } from './components/view/device-info/device-info.component';
import { DefaultsComponent } from './components/view/defaults/defaults.component';

@NgModule({
    declarations: [
        DeviceListComponent,
        RemoveComponent,
        PreferencesComponent,
        DeviceAddComponent,
        DeviceEditComponent,
        CityInputComponent,
        CountryInputComponent,
        RegionInputComponent,
        TimezoneInputComponent,
        AddCompleteComponent,
        DevicesComponent,
        DeviceInfoComponent,
        DefaultsComponent,
    ],
    entryComponents: [
        DeviceAddComponent,
        RemoveComponent
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
        MatRadioModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        SharedModule,
        DeviceRoutingModule
    ],
    providers: [
        DeviceService
    ]
})
export class DeviceModule { }
