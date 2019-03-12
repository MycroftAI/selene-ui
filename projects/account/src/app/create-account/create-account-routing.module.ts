import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountComponent } from './create-account.component';

const createAccountRoutes: Routes = [
    {
        path: 'new',
        component: CreateAccountComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(createAccountRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CreateAccountRoutingModule { }
