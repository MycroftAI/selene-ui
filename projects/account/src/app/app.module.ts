import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GlobalnavModule } from 'globalnav';
import { DeviceModule } from './modules/device/device.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SharedModule as SharedLibModule } from 'shared';
import { SharedModule } from 'shared';
import { SkillModule } from './modules/skill/skill.module';

@NgModule(
    {
        declarations: [ AppComponent ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            DashboardModule,
            GlobalnavModule,
            HttpClientModule,
            DeviceModule,
            ProfileModule,
            SharedLibModule,
            SharedModule,
            SkillModule,
            AppRoutingModule
        ],
        bootstrap: [ AppComponent ]
    }
)
export class AppModule { }
