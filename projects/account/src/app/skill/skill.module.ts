import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule
    ]
})
export class SkillModule { }
