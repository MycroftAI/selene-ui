import { Component, Input, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatBottomSheet } from '@angular/material';
import { Subscription } from 'rxjs';

import { AccountMembership } from '@account/models/account-membership.model';
import { MembershipType } from '@account/models/membership.model';
import { ProfileService } from '../../profile.service';
import { PaymentComponent } from '../../payment/payment.component';

@Component({
    selector: 'account-membership-edit',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnDestroy {
    @Input() accountMembership: AccountMembership;
    public alignVertical: boolean;
    @Input() membershipTypes: MembershipType[];
    private mediaWatcher: Subscription;

    constructor(
        public bottomSheet: MatBottomSheet,
        public mediaObserver: MediaObserver,
        private profileService: ProfileService,
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

    onMembershipChange(membershipType: string) {
        const selectedMembership = this.membershipTypes.find(
            (membership) => membership.type === membershipType
        );
        if (selectedMembership) {
            if (this.accountMembership) {
                // We have the user's credit card info but they decide to change plans
                this.profileService.updateAccount({support: {membership: membershipType}});
            } else {
                // No credit card info.  Go to payment screen to collect
                this.openBottomSheet();
            }
        } else {
            // Membership termination
            this.profileService.updateAccount({support: {membership: null}});
        }
    }

    openBottomSheet() {
        const bottomSheetConfig = {
            data: {newAccount: false},
            disableClose: true,
            restoreFocus: true
        };
        const bottomSheetRef = this.bottomSheet.open(PaymentComponent, bottomSheetConfig);
        bottomSheetRef.afterDismissed().subscribe(
            (dismissValue) => {
                if (dismissValue === 'cancel') {
                    this.profileService.setSelectedMembershipType(
                        this.accountMembership,
                        this.membershipTypes
                    );
                }
            }
        );
    }

}
