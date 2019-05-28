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
import { NewAccountModule } from './modules/new-account/new-account.module';
import { SharedModule as SharedLibModule } from 'shared';
import { SharedModule } from './shared/shared.module';


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
        AppRoutingModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
