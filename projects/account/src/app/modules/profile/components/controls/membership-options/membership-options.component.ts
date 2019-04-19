import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatButtonToggleChange, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';

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
            private profileService: ProfileService,
            public paymentDialog: MatDialog,
            private snackbar: MatSnackBar
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }

    ngOnInit(): void {
        this.profileService.selectedMembershipType.subscribe(
            (membershipType) => { this.selectedMembershipType = membershipType; }
        );
        this.profileService.setSelectedMembershipType(
            this.accountMembership,
            this.membershipTypes
        );

    }

    ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
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
                }
            }
        );
    }
}
