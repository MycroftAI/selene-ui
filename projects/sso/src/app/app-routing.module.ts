import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { MaintenancePageComponent } from 'shared';
import { PageNotFoundComponent } from 'shared';

const routes: Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'change-password', component: ChangePasswordComponent},
    { path: 'maintenance', component: MaintenancePageComponent},
    { path: 'new-account', loadChildren: './modules/new-account/new-account.module#NewAccountModule' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
