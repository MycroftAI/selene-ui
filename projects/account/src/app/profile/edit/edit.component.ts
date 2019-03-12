import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Account, MembershipType, ProfileService } from '../profile.service';

@Component({
    selector: 'account-profile-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    public account: Account;
    public membershipTypes: MembershipType[];

    constructor(private service: ProfileService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {account: Account, membershipTypes: MembershipType[]}) => {
                this.account = data.account;
                this.membershipTypes = data.membershipTypes;
            }
        );
    }

}
