import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountResolverService } from './account-resolver.service';
import { MembershipResolverService } from './membership-resolver.service';
import { EditComponent } from './edit/edit.component';

const profileRoutes: Routes = [
    {
        path: 'profile',
        component: EditComponent,
        resolve: {
            account: AccountResolverService,
            membershipTypes: MembershipResolverService
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule { }
