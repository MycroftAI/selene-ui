import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ApiService } from '../../core/http/api.service';
import { FederatedLoginComponent } from './federated-login/federated-login.component';
import { InternalLoginComponent } from './internal-login/internal-login.component';
import { LoginComponent } from './login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        LoginComponent,
        FederatedLoginComponent,
        InternalLoginComponent,
        PasswordResetComponent
    ],
    entryComponents: [
        LoginComponent,
        PasswordResetComponent,
    ],
    exports: [
        LoginComponent,
        FederatedLoginComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule
    ],
    providers: [ApiService]
})
export class LoginModule { }
