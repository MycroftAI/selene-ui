import { Component, OnInit } from '@angular/core';

import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';

@Component({
  selector: 'account-dashboard-marketplace',
  templateUrl: './dashboard-marketplace.component.html',
  styleUrls: ['./dashboard-marketplace.component.scss']
})
export class DashboardMarketplaceComponent implements OnInit {
    public downloadIcon = faDownload;
    public marketplaceUrl = environment.mycroftUrls.marketplace;

    constructor() { }

    ngOnInit(): void {
  }

}
