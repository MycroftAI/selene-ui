import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAccountComponent } from './new-account.component';

const routes: Routes = [
    { path: '', component: NewAccountComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class NewAccountRoutingModule {
}
