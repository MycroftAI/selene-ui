import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SettingSectionComponent } from './setting-section/setting-section.component';
import { SkillComponent } from './skill.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
    declarations: [
        SettingSectionComponent,
        SkillComponent,
        SettingComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class SkillModule { }
