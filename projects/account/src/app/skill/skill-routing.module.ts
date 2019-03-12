import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillComponent } from './skill.component';

const skillRoutes: Routes = [
    {path: 'skill', component: SkillComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(skillRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SkillRoutingModule { }
