import { Component, OnInit } from '@angular/core';

import { ProfileService, Account } from './profile.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'account-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public account$: Observable<Account>;

    constructor(private service: ProfileService) { }

    ngOnInit() {
        this.account$ = this.service.getAccount();
    }
}
