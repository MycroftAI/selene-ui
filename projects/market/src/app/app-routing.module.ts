import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePageComponent } from 'shared';
import { PageNotFoundComponent } from 'shared';

const routes: Routes = [
    { path: '', redirectTo: '/skills', pathMatch: 'full' },
    { path: 'maintenance', component: MaintenancePageComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
