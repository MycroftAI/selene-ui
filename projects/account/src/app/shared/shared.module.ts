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

import { DisplayFieldComponent } from './components/display-field/display-field.component';
import { OptionButtonsComponent } from './components/option-buttons/option-buttons.component';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { RegionInputComponent } from './components/region-input/region-input.component';

@NgModule({
    declarations: [
        DisplayFieldComponent,
        OptionButtonsComponent,
        CountryInputComponent,
        RegionInputComponent
    ],
    exports: [
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
