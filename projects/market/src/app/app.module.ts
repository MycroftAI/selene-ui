import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { GlobalnavModule } from 'globalnav';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from 'shared';
import { SkillsModule } from './skills/skills.module';

@NgModule(
    {
        declarations: [ AppComponent ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            GlobalnavModule,
            HttpClientModule,
            MaterialModule,
            SharedModule,
            SkillsModule,
            AppRoutingModule
        ],
        providers: [ AppService ],
        bootstrap: [ AppComponent ]
    }
)
export class AppModule { }
