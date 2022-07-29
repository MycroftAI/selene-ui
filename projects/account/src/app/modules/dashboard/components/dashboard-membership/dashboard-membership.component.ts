import { Component, Input, OnInit } from '@angular/core';

import { faAward } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';
import { Account } from '@account/models/account.model';

@Component({
  selector: 'account-dashboard-membership',
  templateUrl: './dashboard-membership.component.html',
  styleUrls: ['./dashboard-membership.component.scss']
})
export class DashboardMembershipComponent implements OnInit {
    @Input() account: Account;
    public membershipIcon = faAward;
    public profileUrl = environment.mycroftUrls.account + '/profile';

  constructor() { }

  ngOnInit(): void {
  }

}
