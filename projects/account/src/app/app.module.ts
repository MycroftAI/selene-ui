import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AppService } from './app.service';
import { CreateAccountModule } from './create-account/create-account.module';
import { GlobalnavModule } from 'globalnav';
import { PageNotFoundModule } from 'page-not-found';
import { DeviceModule } from './device/device.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from 'shared';

@NgModule(
    {
        declarations: [ AppComponent ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            CreateAccountModule,
            GlobalnavModule,
            HttpClientModule,
            DeviceModule,
            PageNotFoundModule,
            ProfileModule,
            SharedModule,
            AppRoutingModule
        ],
        // providers: [ AppService ],
        bootstrap: [ AppComponent ]
    }
)
export class AppModule { }
