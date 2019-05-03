import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChangePasswordModule } from './modules/change-password/change-password.module';
import { GlobalnavModule } from 'globalnav';
import { LoginModule } from './modules/login/login.module';
import { LogoutModule } from './modules/logout/logout.module';
// import { NewAccountModule } from './modules/new-account/new-account.module';
import { PageNotFoundModule } from 'page-not-found';
// import { SharedModule } from './shared/shared.module';

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
        // SharedModule,
        LoginModule,
        LogoutModule,
        // NewAccountModule,
        PageNotFoundModule,
        AppRoutingModule
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
