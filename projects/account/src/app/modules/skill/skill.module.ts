import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SkillSettingsComponent } from './skill-setting/skill-settings.component';
import { SkillComponent } from './skill.component';
import { SettingFieldComponent } from './setting-field/setting-field.component';
import { SettingSectionComponent } from './setting-section/setting-section.component';
import { SkillPanelComponent } from './skill-panel/skill-panel.component';
import { SkillRoutingModule } from './skill-routing.module';
import { SharedModule } from 'shared';

@NgModule({
    declarations: [
        SkillSettingsComponent,
        SkillComponent,
        SettingFieldComponent,
        SettingSectionComponent,
        SkillPanelComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        SharedModule,
        SkillRoutingModule
    ]
})
export class SkillModule { }
