import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
import { AddComponent } from './pages/add/add.component';
import { DeviceComponent } from '@account/app/modules/device/device.component';
import { DeviceEditComponent } from './pages/device-edit/device-edit.component';
import { DeviceDisplayComponent } from './components/view/device-display/device-display.component';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceService } from '@account/http/device.service';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { RegionInputComponent } from './components/input/region-input/region-input.component';
import { RemoveComponent } from './remove/remove.component';
import { SharedModule } from '../../shared/shared.module';
import { TimezoneInputComponent } from './components/input/timezone-input/timezone-input.component';
import { PreferencesCardComponent } from './components/card/preferences-card/preferences-card.component';
import { DefaultsComponent } from './pages/defaults/defaults.component';
import { DefaultsCardComponent } from './components/card/defaults-card/defaults-card.component';
import { AutocompleteInputComponent } from './components/input/autocomplete-input/autocomplete-input.component';
import { GeographyCardComponent } from './components/card/geography-card/geography-card.component';
import { VoiceCardComponent } from './components/card/voice-card/voice-card.component';
import { WakeWordCardComponent } from './components/card/wake-word-card/wake-word-card.component';
import { DeviceEditCardComponent } from './components/card/device-edit-card/device-edit-card.component';

@NgModule({
    declarations: [
        AddCompleteComponent,
        CityInputComponent,
        CountryInputComponent,
        AddComponent,
        DeviceComponent,
        DeviceEditComponent,
        DeviceDisplayComponent,
        DeviceListComponent,
        PreferencesComponent,
        RegionInputComponent,
        RemoveComponent,
        TimezoneInputComponent,
        PreferencesCardComponent,
        DefaultsComponent,
        DefaultsCardComponent,
        AutocompleteInputComponent,
        GeographyCardComponent,
        VoiceCardComponent,
        WakeWordCardComponent,
        DeviceEditCardComponent,
    ],
    entryComponents: [
        DeviceComponent,
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
