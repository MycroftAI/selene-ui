import { Component, OnInit } from '@angular/core';

import { Account, MembershipType, ProfileService } from './profile.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'account-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public account$ = new Observable<Account>();
    public membershipTypes$ = new Observable<MembershipType[]>();

    constructor(private service: ProfileService) { }

    ngOnInit() {
        this.account$ = this.service.getAccount();
        this.membershipTypes$ = this.service.getMembershipTypes();
    }
}
