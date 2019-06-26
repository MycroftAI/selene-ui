import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AgreementStepComponent } from './agreement-step/agreement-step.component';
import { AuthenticationStepComponent } from './authentication-step/authentication-step.component';
import { LoginModule } from '../login/login.module';
import { NewAccountComponent } from './new-account.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedModule as SeleneModule} from 'shared';
import { ApiService } from '../../core/http/api.service';


@NgModule({
    declarations: [
        AgreementStepComponent,
        AuthenticationStepComponent,
        NewAccountComponent,
    ],
    imports: [
        CommonModule,
        A11yModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        LoginModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        SharedModule,
        ReactiveFormsModule,
        SeleneModule
    ],
    providers: [
        ApiService,
    ],
})
export class NewAccountModule { }
