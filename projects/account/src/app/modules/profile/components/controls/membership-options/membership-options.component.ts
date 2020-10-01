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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { AccountMembership } from '@account/models/account-membership.model';
import { MembershipType } from '@account/models/membership.model';
import { ProfileService } from '@account/http/profile.service';
import { PaymentComponent } from '@account/app/modules/profile/components/views/payment/payment.component';
import { MembershipUpdate } from '@account/models/membership-update.model';


@Component({
    selector: 'account-membership-options',
    templateUrl: './membership-options.component.html',
    styleUrls: ['./membership-options.component.scss']
})
export class MembershipOptionsComponent implements OnInit, OnDestroy {
    @Input() accountMembership: AccountMembership;
    @Input() membershipTypes: MembershipType[];
    @Output() membershipChange = new EventEmitter<MembershipUpdate>();
    public alignVertical: boolean;
    public mediaWatcher: Subscription;
    public selectedMembershipType: string;

    constructor(
            public mediaObserver: MediaObserver,
            public paymentDialog: MatDialog,
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }

    ngOnInit(): void {
        this.setSelectedMembershipType();
    }

    ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
    }

    setSelectedMembershipType() {
        let selectedMembership: MembershipType;
        if (this.accountMembership) {
            selectedMembership = this.membershipTypes.find(
            (membershipType) => membershipType.type === this.accountMembership.type
            );
            this.selectedMembershipType = selectedMembership.type;
        } else {
            this.selectedMembershipType = 'Maybe Later';
        }
    }

    onMembershipSelect(membershipType: MatButtonToggleChange) {
        const selectedMembership = this.membershipTypes.find(
            (membership) => membership.type === membershipType.value
        );
        let membershipUpdate;
        if (selectedMembership) {
            if (this.accountMembership) {
                // We have the user's credit card info but they decide to change plans
                membershipUpdate = {
                    paymentMethod: 'Stripe',
                    newMembership: false,
                    membershipType: membershipType
                };
                this.membershipChange.emit(membershipUpdate);
            } else {
                // No credit card info.  Go to payment dialog to collect
                this.openPaymentDialog(membershipType.value);
            }
        } else {
            // Membership termination
            membershipUpdate = {newMembership: false, membershipType: null};
            this.membershipChange.emit(membershipUpdate);
        }
    }

    openPaymentDialog(membershipType: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {newAccount: false, membershipType: membershipType};
        dialogConfig.disableClose = true;
        dialogConfig.restoreFocus = true;
        const dialogRef = this.paymentDialog.open(PaymentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (stripeToken) => {
                if (stripeToken) {
                    const membershipUpdate: MembershipUpdate = {
                        newMembership: true,
                        membershipType: membershipType,
                        paymentMethod: 'Stripe',
                        paymentToken: stripeToken
                    };
                    this.membershipChange.emit(membershipUpdate);
                } else {
                    this.setSelectedMembershipType();
                }
            }
        );
    }
}
