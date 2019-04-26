import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatButtonToggleModule, MatSnackBarModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';

import { FacebookButtonComponent } from './facebook-button/facebook-button.component';
import { GithubButtonComponent } from './github-button/github-button.component';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { SharedComponent } from './shared.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

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
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        SharedComponent,
        SnackbarComponent
    ],
    entryComponents: [
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        SocialLoginModule
    ],
    exports: [
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        SharedComponent,
        SnackbarComponent
    ],
    providers: [
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ]
})
export class SharedModule { }
