import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatButtonToggleChange } from '@angular/material';

import { Subscription } from 'rxjs';

import { AccountMembership } from '@account/models/account-membership.model';
import { MembershipType } from '@account/models/membership.model';
import { ProfileService } from '../profile.service';


@Component({
    selector: 'account-membership-options',
    templateUrl: './membership-options.component.html',
    styleUrls: ['./membership-options.component.scss']
})
export class MembershipOptionsComponent implements OnInit, OnDestroy {
    @Input() accountMembership: AccountMembership;
    public alignVertical: boolean;
    @Input() membershipTypes: MembershipType[];
    public mediaWatcher: Subscription;
    @Output() membershipChange = new EventEmitter<string>();
    public selectedMembershipType: string;

    constructor(public mediaObserver: MediaObserver, private profileService: ProfileService) {
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

    onMembershipSelect(newMembershipType: MatButtonToggleChange) {
        this.profileService.selectedMembershipType.next(newMembershipType.value);
        this.membershipChange.emit(newMembershipType.value);
    }

}
