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

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions} from '@stripe/stripe-js';

import { ProfileService } from '@account/http/profile.service';
import { SnackbarComponent } from 'shared';

const twoSeconds = 2000;


@Component({
    selector: 'account-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    @ViewChild(StripeCardComponent) card: StripeCardComponent;
    public cardOptions: StripeCardElementOptions = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#22a7f0',
                color: '#2c3e50',
                '::placeholder': {
                    color: '#6c7a89'
                },
            }
        }
    };

    constructor(
        public dialogRef: MatDialogRef<PaymentComponent>,
        private snackbar: MatSnackBar,
        private profileService: ProfileService,
        private stripeService: StripeService,
        @Inject(MAT_DIALOG_DATA) public dialogData: any

    ) {
    }

    ngOnInit() {
    }

    submitPaymentInfo() {
        this.stripeService.createToken(this.card.element, {}).subscribe({
            next: (result) => {
                if (result.token) {
                    this.dialogRef.close(result.token.id);
                } else if (result.error) {
                    this.showStripeError(result.error.message);
                }
            }
        });
    }

    showStripeError(errorMessage: string) {
        const config = new MatSnackBarConfig();
        config.data = {type: 'error', message: errorMessage};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
