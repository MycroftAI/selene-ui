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

import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ApiService } from '../../core/http/api.service';
import { FederatedLoginComponent } from './federated-login/federated-login.component';
import { InternalLoginComponent } from './internal-login/internal-login.component';
import { LoginComponent } from './login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SharedModule } from '../../shared/shared.module';


export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('2266714353557295')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                    '17489788035-6jpef494tdpiidg80vvfldh2biueiqfi.apps.googleusercontent.com'
                )
            }
        ]
    );
}

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
        SocialLoginModule,
        RouterModule
    ],
    providers: [
        ApiService,
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ]
})
export class LoginModule { }
