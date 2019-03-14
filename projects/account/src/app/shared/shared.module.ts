import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import { DisplayFieldComponent } from './components/display-field/display-field.component';
import { OptionButtonsComponent } from './components/option-buttons/option-buttons.component';

@NgModule({
    declarations: [
        DisplayFieldComponent,
        OptionButtonsComponent
    ],
    exports: [
        DisplayFieldComponent,
        OptionButtonsComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class SharedModule { }
