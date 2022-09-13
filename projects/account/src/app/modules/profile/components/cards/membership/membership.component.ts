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

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { faCreditCard, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { AccountMembership } from '@account/models/account-membership.model';
import { MembershipType } from '@account/models/membership.model';
import { MembershipUpdate } from '@account/models/membership-update.model';
import { ProfileService } from '@account/http/profile.service';
import { MembershipCancelConfirmComponent } from '@account/app/modules/profile/components/modals/membership-cancel-confirm/membership-cancel-confirm.component';
import { PaymentComponent } from '@account/app/modules/profile/components/views/payment/payment.component';
import { SnackbarComponent } from 'shared';


@Component({
    selector: 'account-membership-edit',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnDestroy {
    @Input() accountMembership: AccountMembership;
    @Input() membershipTypes: MembershipType[];
    @Output() membershipUpdated = new EventEmitter();
    public alignVertical: boolean;
    private mediaWatcher: Subscription;
    public membershipIcon: IconDefinition = faCreditCard;

    constructor(
        public cancelConfirmDialog: MatDialog,
        public mediaObserver: MediaObserver,
        public paymentDialog: MatDialog,
        private profileService: ProfileService,
        private snackbar: MatSnackBar
    ) {
        this.mediaWatcher = mediaObserver.asObservable().subscribe(
            (change: MediaChange[]) => {
                change.forEach((item) => {
                  this.alignVertical = ['xs', 'sm'].includes(item.mqAlias);
                });
          }
        );
    }

    ngOnDestroy(): void {
        this.mediaWatcher.unsubscribe();
    }

    openPaymentDialog(membershipType: MembershipType) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {newAccount: false, membershipType: membershipType};
        dialogConfig.disableClose = true;
        dialogConfig.maxWidth = 520;
        dialogConfig.restoreFocus = true;
        const dialogRef = this.paymentDialog.open(PaymentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (stripeToken) => {
                const membershipUpdate: MembershipUpdate = {
                    action: 'add',
                    membershipType: membershipType.type,
                    paymentMethod: 'Stripe',
                    paymentToken: stripeToken
                };
                if (this.accountMembership) {
                    membershipUpdate.action = 'update';
                }
                this.updateAccount(membershipUpdate);
            }
        );
    }

    openCancelConfirmDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.maxWidth = 520;
        dialogConfig.restoreFocus = true;
        const dialogRef = this.cancelConfirmDialog.open(MembershipCancelConfirmComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (cancelled) => {
                if (cancelled) {
                    const membershipUpdate: MembershipUpdate = { action: 'cancel' };
                    this.updateAccount(membershipUpdate);
                }
            }
        );
    }

    updateAccount(membershipUpdate: MembershipUpdate) {
        const accountUpdate = {membership: membershipUpdate};
        const config = new MatSnackBarConfig();
        let successMessage: string;
        let errorMessage: string;

        if (membershipUpdate.action === 'add') {
            successMessage = 'Membership added.  Thank you!';
            errorMessage = 'Failed to add membership - contact support';
        } else if (membershipUpdate.action === 'cancel') {
            successMessage = 'Membership cancelled';
            errorMessage = 'Failed to cancel membership - contact support';
        } else {
            successMessage = 'Payment information updated';
            errorMessage = 'Failed to update payment information - contact support';
        }

        this.profileService.updateAccount(accountUpdate).subscribe({
            next: () => {
                this.membershipUpdated.emit();
                config.data = {type: 'info', message: successMessage};
                this.snackbar.openFromComponent(SnackbarComponent, config);
            },
            error: () => {
                config.data = {type: 'error', message: errorMessage};
                this.snackbar.openFromComponent(SnackbarComponent, config);
            }}
        );
    }
}
