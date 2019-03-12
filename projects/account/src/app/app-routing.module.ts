import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from 'page-not-found';

const routes: Routes = [
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
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
