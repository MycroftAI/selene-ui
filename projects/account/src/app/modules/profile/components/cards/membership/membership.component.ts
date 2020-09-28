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

import { Component, Input, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { AccountMembership } from '@account/models/account-membership.model';
import { MembershipType } from '@account/models/membership.model';
import { MembershipUpdate } from '@account/models/membership-update.model';
import { ProfileService } from '@account/http/profile.service';

const twoSeconds = 2000;


@Component({
    selector: 'account-membership-edit',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnDestroy {
    @Input() accountMembership: AccountMembership;
    @Input() membershipTypes: MembershipType[];
    public alignVertical: boolean;
    private mediaWatcher: Subscription;

    constructor(
        public mediaObserver: MediaObserver,
        private profileService: ProfileService,
        private snackbar: MatSnackBar
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
              this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
          }
        );
    }

    ngOnDestroy(): void {
        this.mediaWatcher.unsubscribe();
    }

    updateAccount(membershipUpdate: MembershipUpdate) {
        const accountUpdate = {membership: membershipUpdate};
        this.profileService.updateAccount(accountUpdate).subscribe(
            () => {
                this.snackbar.open(
                    'Membership updated',
                    null,
                    {panelClass: 'mycroft-no-action-snackbar', duration: twoSeconds}
                );
            }
        );
    }

}
