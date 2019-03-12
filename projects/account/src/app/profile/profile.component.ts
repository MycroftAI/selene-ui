import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Account, MembershipType, ProfileService } from './profile.service';

@Component({
    selector: 'account-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public account: Account;
    public membershipTypes: MembershipType[];
    private stripeToken: string;

    constructor(private service: ProfileService, private route: ActivatedRoute) { }

    /**
     * If a stripe token exists in local storage, then we got here from the
     * payment page.  In this case, we need to update the account with the
     * new membership before retrieving it.  Otherwise, go straight to
     * retrieving the account data.
     *
     * NOTE: This feels hacky.  The original author is an Angular noob.
     * There could be a better way to code the new membership flow.
     */
    ngOnInit() {
        this.route.data.subscribe(
            (data: {account: Account, membershipTypes: MembershipType[]}) => {
                this.account = data.account;
                this.membershipTypes = data.membershipTypes;
            }
        );
    }

    checkForNewMembership(): void {
        this.stripeToken = localStorage.getItem('stripeToken');
        if (this.stripeToken) {
            localStorage.removeItem('stripeToken');
            this.updateMembership();
        }
    }

    updateMembership() {
        // TODO: put new code in here to update the account
    }

    getProfileData() {
        // this.account$ = this.service.getAccount();
        // this.membershipTypes$ = this.service.getMembershipTypes();
    }

}
