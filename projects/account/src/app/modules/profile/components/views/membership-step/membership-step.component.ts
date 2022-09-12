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

import { Component, Input, OnInit } from '@angular/core';
import { MembershipType } from '@account/models/membership.model';
import { MembershipUpdate } from '@account/models/membership-update.model';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentComponent } from '@account/app/modules/profile/components/views/payment/payment.component';

@Component({
    selector: 'account-membership-step',
    templateUrl: './membership-step.component.html',
    styleUrls: ['./membership-step.component.scss']
})
export class MembershipStepComponent implements OnInit {
    @Input() membershipTypes: MembershipType[];
    @Input() newAcctForm: UntypedFormGroup;
    public membershipDescription: string[];

    constructor(public paymentDialog: MatDialog) {
        this.membershipDescription = [
            'Mycroft\'s voice assistant software is open source, which means it is free to use and ' +
            'the underlying source code is available to the public.  Our entire platform is free ' +
            'of advertisements.  The data we collect from those that opt in to our open dataset ' +
            'is not sold to anyone.',
            'While many contributions to the Mycroft platform come in the form ' +
            'of volunteer work by community  members, there is also a small team employed by Mycroft AI.  ' +
            'The team curates the software, supports the community and ensures the privacy of your data.  ' +
            'Your donation will help ensure our team can continue providing these services to our ' +
            'users and community.'
        ];

    }

    ngOnInit() {
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
                this.updateNewAccountForm(membershipUpdate);
            }
        );
    }

    updateNewAccountForm(membershipUpdate: MembershipUpdate): void {
        this.newAcctForm.patchValue(
            {
                membership: {
                    action: membershipUpdate.action,
                    membershipType: membershipUpdate.membershipType,
                    paymentMethod: membershipUpdate.paymentMethod,
                    paymentToken: membershipUpdate.paymentToken
                }
            }
        );
    }
}
