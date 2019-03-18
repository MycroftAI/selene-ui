import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import { CityInputComponent } from './components/city-input/city-input.component';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { DisplayFieldComponent } from './components/display-field/display-field.component';
import { OptionButtonsComponent } from './components/option-buttons/option-buttons.component';
import { RegionInputComponent } from './components/region-input/region-input.component';
import { TimezoneInputComponent } from './components/timezone-input/timezone-input.component';

@NgModule({
    declarations: [
        CityInputComponent,
        CountryInputComponent,
        DisplayFieldComponent,
        OptionButtonsComponent,
        RegionInputComponent,
        TimezoneInputComponent
    ],
    exports: [
        CityInputComponent,
        CountryInputComponent,
        DisplayFieldComponent,
        OptionButtonsComponent,
        RegionInputComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class SharedModule { }
