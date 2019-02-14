import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButtonToggleModule } from '@angular/material';

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
import { MembershipOptionsComponent } from './membership-options/membership-options.component';
import { SharedComponent } from './shared.component';
import { SharedService } from './shared.service';

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
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        MembershipOptionsComponent,
        SharedComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MatButtonModule,
        MatButtonToggleModule,
        SocialLoginModule
    ],
    exports: [
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        MembershipOptionsComponent,
        SharedComponent
    ],
    providers: [
        SharedService,
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ]
})
export class SharedModule { }
