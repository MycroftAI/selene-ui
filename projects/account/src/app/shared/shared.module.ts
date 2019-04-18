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
import { OptionBtnComponent } from './components/option-btn/option-btn.component';

@NgModule({
    declarations: [
        DisplayFieldComponent,
        OptionButtonsComponent,
        OptionBtnComponent,
    ],
    exports: [
        DisplayFieldComponent,
        OptionButtonsComponent,
        OptionBtnComponent
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
