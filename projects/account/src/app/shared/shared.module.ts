import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { DisplayFieldComponent } from './components/display-field/display-field.component';

@NgModule({
    declarations: [
        DisplayFieldComponent
    ],
    exports: [
        DisplayFieldComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class SharedModule { }
