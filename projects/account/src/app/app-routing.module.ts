import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountResolverService } from './core/guards/account-resolver.service';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MaintenancePageComponent } from 'shared';
import { PageNotFoundComponent } from 'shared';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, resolve: {account: AccountResolverService} },
    { path: 'maintenance', component: MaintenancePageComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            }
        )
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
