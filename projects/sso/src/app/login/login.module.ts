import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppService } from '../app.service';
import { FederatedLoginComponent } from './federated-login/federated-login.component';
import { InternalLoginComponent } from './internal-login/internal-login.component';
import { LoginComponent } from './login.component';
import { SharedModule } from 'shared';

@NgModule({
    declarations: [
        FederatedLoginComponent,
        InternalLoginComponent,
        LoginComponent
    ],
    entryComponents: [ LoginComponent ],
    exports: [ LoginComponent ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        AppService
    ]
})
export class LoginModule { }
