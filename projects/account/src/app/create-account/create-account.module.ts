import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthenticationStepComponent } from './authentication-step/authentication-step.component';
import { AgreementStepComponent } from './agreement-step/agreement-step.component';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountService } from './create-account.service';
import { DisplayNameStepComponent } from './display-name-step/display-name-step.component';
import { SharedModule } from 'shared';
import { SupportStepComponent } from './support-step/support-step.component';
import { DoneStepComponent } from './done-step/done-step.component';

@NgModule({
    declarations: [
        CreateAccountComponent,
        AgreementStepComponent,
        DisplayNameStepComponent,
        AuthenticationStepComponent,
        SupportStepComponent,
        DoneStepComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatStepperModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
        CreateAccountService
    ]
})
export class CreateAccountModule { }
