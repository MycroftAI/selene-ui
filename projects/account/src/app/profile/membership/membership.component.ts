import { Component, Input, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Membership, MembershipType } from '../profile.service';

@Component({
    selector: 'account-membership',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnDestroy {
    @Input() accountMembership: Membership;
    @Input() membershipTypes: MembershipType[];
    public alignVertical: boolean;
    private mediaWatcher: Subscription;

    constructor(public mediaObserver: MediaObserver, private router: Router) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
              this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
          }
        );
    }

  ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
  }
}
