import { Component, OnInit } from '@angular/core';

import { faGear } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';

@Component({
    selector: 'account-dashboard-skill',
    templateUrl: './dashboard-skill.component.html',
    styleUrls: ['./dashboard-skill.component.scss']
})
export class DashboardSkillComponent implements OnInit {
    public settingsIcon = faGear;
    public settingsUrl = environment.mycroftUrls.account + '/skills';

    constructor() { }

    ngOnInit(): void {
  }

}
