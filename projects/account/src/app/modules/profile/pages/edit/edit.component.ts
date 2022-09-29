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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Account } from '@account/models/account.model';
import { MembershipType } from '@account/models/membership.model';
import { ProfileService } from '@account/http/profile.service';

@Component({
    selector: 'account-profile-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    public account: Account;
    public membershipTypes: MembershipType[];

    constructor(private service: ProfileService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {account: Account, membershipTypes: MembershipType[]}) => {
                this.account = data.account;
                this.membershipTypes = data.membershipTypes;
            }
        );
    }

    refreshAccount() {
        this.service.getAccount().subscribe({
            next: (account) => { this.account = account; }
        });
    }
}
