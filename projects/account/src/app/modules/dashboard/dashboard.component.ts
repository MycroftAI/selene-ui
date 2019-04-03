import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faAward, faDownload } from '@fortawesome/free-solid-svg-icons';

import { Account } from '@account/models/account.model';
import { environment } from '@account/environments/environment';

@Component({
    selector: 'account-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public account: Account;
    public awardIcon = faAward;
    public downloadIcon = faDownload;
    public marketplaceUrl = environment.mycroftUrls.marketplace;
    public settingsUrl = environment.mycroftUrls.account + '/skills';
    public voicesUrl = environment.mycroftUrls.mimic;
    public accountUrl = environment.mycroftUrls.account + '/profile';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {account: Account}) => { this.account = data.account; }
        );
    }
}
