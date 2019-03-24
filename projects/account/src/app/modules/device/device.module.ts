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

import { AddCompleteComponent } from './components/view/add-complete/add-complete.component';
import { CityInputComponent } from './components/input/city-input/city-input.component';
import { CountryInputComponent } from './components/input/country-input/country-input.component';
import { DefaultsComponent } from './components/view/defaults/defaults.component';
import { DeviceAddComponent } from './pages/device-add/device-add.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceInfoComponent } from './components/view/device-info/device-info.component';
import { DeviceListComponent } from './components/view/device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DevicesComponent } from './pages/devices/devices.component';
import { DeviceService } from '@account/http/device.service';
import { PreferencesComponent } from './components/view/preferences/preferences.component';
import { RegionInputComponent } from './components/input/region-input/region-input.component';
import { RemoveComponent } from './remove/remove.component';
import { SharedModule } from '../../shared/shared.module';
import { TimezoneInputComponent } from './components/input/timezone-input/timezone-input.component';

@NgModule({
    declarations: [
        AddCompleteComponent,
        CityInputComponent,
        CountryInputComponent,
        DefaultsComponent,
        DeviceAddComponent,
        DeviceEditComponent,
        DeviceInfoComponent,
        DeviceListComponent,
        DevicesComponent,
        PreferencesComponent,
        RegionInputComponent,
        RemoveComponent,
        TimezoneInputComponent,
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
