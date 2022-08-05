/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountResolverService } from '@account/app/core/guards/account-resolver.service';
import { MembershipResolverService } from '@account/app/core/guards/membership-resolver.service';
import { EditComponent } from './pages/edit/edit.component';
import { NewComponent } from './pages/new/new.component';
import { ChangePasswordComponent } from '@account/app/modules/profile/pages/change-password/change-password.component';

const profileRoutes: Routes = [
    {
        path: 'new',
        component: NewComponent,
        resolve: {
            membershipTypes: MembershipResolverService
        }
    },
    {
        path: 'profile',
        component: EditComponent,
        resolve: {
            account: AccountResolverService,
            membershipTypes: MembershipResolverService
        }
    },
    {
        path: 'password-change',
        component: ChangePasswordComponent
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
