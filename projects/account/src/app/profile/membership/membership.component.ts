import { Component, Input, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { Membership } from '../profile.service';

export interface SubscriptionType {
    name: string;
    price: string;
    period: string;
}

const nonSupporter: SubscriptionType = {
  name: 'Maybe Later',
  price: '$0',
  period: null
};
const monthlySupporter: SubscriptionType = {
  name: 'Monthly Supporter',
  price: '$1.99',
  period: 'month'
};
const yearlySupporter: SubscriptionType = {
  name: 'Yearly Supporter',
  price: '$19.99',
  period: 'year'
};


@Component({
  selector: 'account-subscription',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnDestroy {
    @Input() accountMembership: Membership;
    public subscriptionTypes: SubscriptionType[];
    public alignVertical: boolean;
    private mediaWatcher: Subscription;

  constructor(public mediaObserver: MediaObserver) {
      this.mediaWatcher = mediaObserver.media$.subscribe(
          (change: MediaChange) => {
              this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
          }
      );
      this.subscriptionTypes = [yearlySupporter, monthlySupporter, nonSupporter];
  }

  ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
  }
}
