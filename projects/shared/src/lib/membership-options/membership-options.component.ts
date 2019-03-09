import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatButtonToggleChange } from '@angular/material';

import { Subscription } from 'rxjs';

export interface MembershipType {
    type: string;
    rate: string;
    ratePeriod: string;
    stripePlan: string;
}

@Component({
    selector: 'shared-membership-options',
    templateUrl: './membership-options.component.html',
    styleUrls: ['./membership-options.component.scss']
})
export class MembershipOptionsComponent implements OnDestroy {
    @Input() accountMembership: string;
    public alignVertical: boolean;
    @Input() membershipTypes: MembershipType[];
    public mediaWatcher: Subscription;
    @Output() membershipSelected = new EventEmitter<string>();

    constructor(public mediaObserver: MediaObserver) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }

    onMembershipSelect(membershipType: MatButtonToggleChange) {
        this.membershipSelected.emit(membershipType.value);
    }

    ngOnDestroy(): void {
      this.mediaWatcher.unsubscribe();
    }

}
