import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';

import { FederatedLoginComponent } from './federated-login/federated-login.component';
import { InternalLoginComponent } from './internal-login/internal-login.component';
import { LoginComponent } from './login.component';
import { AppService } from '../app.service';

export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('2266714353557295')
            },
            // {
            //     id: GoogleLoginProvider.PROVIDER_ID,
            //     provider: new GoogleLoginProvider("Your-Google-Client-Id")
            // }
        ]
    );
}

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
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        SocialLoginModule
    ],
    providers: [
        AppService,
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ]
})
export class LoginModule { }
