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

import { DeviceComponent } from './device.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceService } from '../../core/http/device.service';
import { PreferencesComponent } from './preferences/preferences.component';
import { RemoveComponent } from './remove/remove.component';
import { SharedModule } from '../../shared/shared.module';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceConfigComponent } from './device-list/device-config/device-config.component';
import { DeviceLocationComponent } from './device-list/device-location/device-location.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { CityInputComponent } from './device-edit/city-input/city-input.component';
import { CountryInputComponent } from './device-edit/country-input/country-input.component';
import { RegionInputComponent } from './device-edit/region-input/region-input.component';
import { TimezoneInputComponent } from './device-edit/timezone-input/timezone-input.component';
import { AddCompleteComponent } from './device-add/add-complete/add-complete.component';

@NgModule({
    declarations: [
        DeviceComponent,
        DeviceListComponent,
        RemoveComponent,
        PreferencesComponent,
        DeviceAddComponent,
        DeviceLocationComponent,
        DeviceEditComponent,
        DeviceConfigComponent,
        CityInputComponent,
        CountryInputComponent,
        RegionInputComponent,
        TimezoneInputComponent,
        AddCompleteComponent
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
