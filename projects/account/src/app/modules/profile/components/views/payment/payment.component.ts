import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatSnackBar
} from '@angular/material';

import { ElementOptions, StripeCardComponent, StripeService } from 'ngx-stripe';

import { ProfileService } from '@account/http/profile.service';

const twoSeconds = 2000;


@Component({
    selector: 'account-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    @ViewChild(StripeCardComponent) card: StripeCardComponent;
    public cardOptions: ElementOptions = {
        style: {
            base: {
                iconColor: '#22a7f0',
                color: '#2c3e50',
                '::placeholder': {
                    color: '#969fa8'
                }
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
        this.stripeService.createToken(this.card.getCard(), {}).subscribe(
            result => {
                if (result.token) {
                    this.dialogRef.close(result.token.id);
                } else if (result.error) {
                    this.showStripeError(result.error.message);
                }
            },
            (result) => { this.showStripeError(result.toString()); }
        );

    }

    showStripeError(errorMessage: string) {
        this.dialogRef.close();
        this.snackbar.open(
            errorMessage,
            null,
            {panelClass: 'mycroft-no-action-snackbar', duration: twoSeconds}
        );
    }

    onCancel() {
        this.dialogRef.close();
    }
}
