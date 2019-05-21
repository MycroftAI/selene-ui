import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';

import { SharedComponent } from './shared.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
        SharedComponent,
        SnackbarComponent,
        MaintenancePageComponent,
        PageNotFoundComponent,
    ],
    entryComponents: [
        SnackbarComponent,
        MaintenancePageComponent,
        PageNotFoundComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        SocialLoginModule
    ],
    exports: [
        SharedComponent,
        SnackbarComponent,
        MaintenancePageComponent,
        PageNotFoundComponent,
    ],
    providers: [
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ]
})
export class SharedModule { }
