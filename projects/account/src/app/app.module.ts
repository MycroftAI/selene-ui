import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalnavModule } from 'globalnav';
import { PageNotFoundModule } from 'page-not-found';
import { DeviceModule } from './modules/device/device.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from 'shared';
import { SkillModule } from './skill/skill.module';

@NgModule(
    {
        declarations: [ AppComponent ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            GlobalnavModule,
            HttpClientModule,
            DeviceModule,
            PageNotFoundModule,
            ProfileModule,
            SharedModule,
            SkillModule,
            AppRoutingModule
        ],
        bootstrap: [ AppComponent ]
    }
)
export class AppModule { }
