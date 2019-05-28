import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChangePasswordModule } from './modules/change-password/change-password.module';
import { GlobalnavModule } from 'globalnav';
import { LoginModule } from './modules/login/login.module';
import { LogoutModule } from './modules/logout/logout.module';
import { NewAccountModule } from './modules/new-account/new-account.module';
import { SharedModule as SharedLibModule } from 'shared';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { ApiService } from './core/http/api.service';


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
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ChangePasswordModule,
        FlexLayoutModule,
        GlobalnavModule,
        SharedLibModule,
        SharedModule,
        LoginModule,
        LogoutModule,
        NewAccountModule,
        SocialLoginModule,
        AppRoutingModule
    ],
    providers: [
        ApiService,
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
