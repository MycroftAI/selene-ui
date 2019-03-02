import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

export interface MembershipType {
    type: string;
    price: string;
    period: string;
}

const monthlySupporter: MembershipType = {
    type: 'Monthly Membership',
    price: '$1.99',
    period: 'month'
};
const yearlySupporter: MembershipType = {
    type: 'Yearly Membership',
    price: '$19.99',
    period: 'year'
};

@Component({
    selector: 'shared-membership-options',
    templateUrl: './membership-options.component.html',
    styleUrls: ['./membership-options.component.scss']
})
export class MembershipOptionsComponent implements OnDestroy {
    @Input() accountMembership: string;
    public alignVertical: boolean;
    public membershipTypes: MembershipType[];
    public mediaWatcher: Subscription;
    @Output() selectedMembership = new EventEmitter<string>();

    constructor(public mediaObserver: MediaObserver) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
        this.membershipTypes = [yearlySupporter, monthlySupporter];
    }

    onMembershipSelect(membership: MembershipType) {
        this.selectedMembership.emit(membership.type);
    }

    ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
    }

}
