import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

export interface MembershipType {
    name: string;
    price: string;
    period: string;
}

const nonSupporter: MembershipType = {
    name: 'NON-SUPPORTER',
    price: '$0',
    period: null
};
const monthlySupporter: MembershipType = {
    name: 'MONTHLY SUPPORTER',
    price: '$1.99',
    period: 'month'
};
const yearlySupporter: MembershipType = {
    name: 'YEARLY SUPPORTER',
    price: '$19.99',
    period: 'year'
};

@Component({
    selector: 'shared-membership-options',
    templateUrl: './membership-options.component.html',
    styleUrls: ['./membership-options.component.scss']
})
export class MembershipOptionsComponent implements OnDestroy {
    public alignVertical: boolean;
    public membershipTypes: MembershipType[];
    public mediaWatcher: Subscription;

    constructor(public mediaObserver: MediaObserver) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
        this.membershipTypes = [yearlySupporter, monthlySupporter, nonSupporter];
    }

    ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
    }

}
