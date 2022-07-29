import { Component, OnInit } from '@angular/core';

import { faUserLock } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';

@Component({
  selector: 'account-dashboard-privacy',
  templateUrl: './dashboard-privacy.component.html',
  styleUrls: ['./dashboard-privacy.component.scss']
})
export class DashboardPrivacyComponent implements OnInit {
    public privacyIcon = faUserLock;
    public personalDataUrl = environment.mycroftUrls.account + '/personal-data';

  constructor() { }

  ngOnInit(): void {
  }

}
