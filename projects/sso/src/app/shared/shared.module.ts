import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EmailInputComponent } from './components/email-input/email-input.component';
import { FacebookButtonComponent } from './components/facebook-button/facebook-button.component';
import { GithubButtonComponent } from './components/github-button/github-button.component';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { environment } from '../../environments/environment';


export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(environment.facebookClientId)
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.googleClientId)
            }
        ]
    );
}



@NgModule({
    declarations: [
        EmailInputComponent,
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        PasswordInputComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        FontAwesomeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        SocialLoginModule
    ],
    entryComponents: [],
    exports: [
        EmailInputComponent,
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        PasswordInputComponent
    ],
    providers: [
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ],
})
export class SharedModule { }
