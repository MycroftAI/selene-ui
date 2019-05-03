import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
} from '@angular/material';


import { ChangePasswordComponent } from './change-password.component';
import { PasswordResetComponent } from '../login/password-reset/password-reset.component';

@NgModule({
    declarations: [
        ChangePasswordComponent
    ],
    entryComponents: [
        PasswordResetComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule
    ]
})
export class ChangePasswordModule { }
