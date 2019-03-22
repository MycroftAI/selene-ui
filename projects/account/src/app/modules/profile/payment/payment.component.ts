import { Component, OnInit, ViewChild } from '@angular/core';
import {
    MatBottomSheetRef,
    MatDialog,
    MatDialogRef,
    MatSnackBar
} from '@angular/material';

import { ElementOptions, StripeCardComponent, StripeService } from 'ngx-stripe';

import { ProfileService } from '@account/http/profile.service';
import { VerifyCardDialogComponent } from './verify-card-dialog.component';

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
    private membershipType: string;
    private dialogRef: MatDialogRef<VerifyCardDialogComponent>;

    constructor(
        private bottomSheetRef: MatBottomSheetRef<PaymentComponent>,
        private paymentSnackbar: MatSnackBar,
        private profileService: ProfileService,
        private stripeService: StripeService,
        public verifyCardDialog: MatDialog

    ) {
    }

    ngOnInit() {
    }

    submitPayment() {
        this.openDialog();
        this.stripeService.createToken(this.card.getCard(), {}).subscribe(
            result => {
                if (result.token) {
                    const configData = this.bottomSheetRef.containerInstance.bottomSheetConfig.data;
                    if (configData.newAccount) {
                        this.showStripeSuccess(result.token.id);
                    } else {
                        this.updateAccount(result.token.id);
                    }
                } else if (result.error) {
                    this.showStripeError(result.error.message);
                }
            }
        );
    }

    openDialog(): void {
        this.dialogRef = this.verifyCardDialog.open(
            VerifyCardDialogComponent,
            {width: '250px'}
        );
    }

    updateAccount(stripeToken: string) {
        const newMembership = {
            support: {
                membership: this.membershipType,
                paymentMethod: 'Stripe',
                paymentToken: stripeToken
            }
        };
        this.profileService.updateAccount(newMembership).subscribe(
            () => { this.showStripeSuccess(stripeToken); }
        );
    }

    showStripeSuccess(stripeToken: string) {
        this.dialogRef.close();
        const paymentSnackbarRef = this.paymentSnackbar.open(
            'Card verification successful',
            null,
            {panelClass: 'mycroft-no-action-snackbar', duration: twoSeconds}
        );
        paymentSnackbarRef.afterDismissed().subscribe(
            () => { this.bottomSheetRef.dismiss(stripeToken); }
        );
    }

    showStripeError(errorMessage: string) {
        this.dialogRef.close();
        this.paymentSnackbar.open(
            errorMessage,
            null,
            {panelClass: 'mycroft-no-action-snackbar', duration: twoSeconds}
        );
    }

    onCancel() {
        this.bottomSheetRef.dismiss('cancel');
    }
}
