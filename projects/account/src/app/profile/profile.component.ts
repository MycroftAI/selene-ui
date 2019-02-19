import { Component, OnInit } from '@angular/core';

import { ProfileService, Account } from './profile.service';

@Component({
    selector: 'account-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public account: Account;

    constructor(private service: ProfileService) { }

    ngOnInit() {
        this.service.getAccount().subscribe(
            (account) => { this.account = account; }
        );
    }
}
