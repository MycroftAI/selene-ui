import { Component, Input, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material';
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
