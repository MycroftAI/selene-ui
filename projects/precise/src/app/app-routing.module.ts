import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePageComponent, PageNotFoundComponent } from 'shared';
import { IntroComponent } from './modules/tagger/pages/intro/intro.component';
import { TagComponent } from './modules/tagger/pages/tag/tag.component';
import { TagEventResolverService } from './core/guards/tag-event-resolver.service';

const routes: Routes = [
    { path: 'tagger', component: IntroComponent},
    {
        path: 'tag/:wakeWord',
        component: TagComponent,
        resolve: {
            tagEvent: TagEventResolverService
        }
    },
    { path: 'maintenance', component: MaintenancePageComponent},
    { path: '', redirectTo: '/tag/hey-mycroft', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
