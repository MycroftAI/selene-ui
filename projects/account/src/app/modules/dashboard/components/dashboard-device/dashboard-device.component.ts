import { Component, OnInit } from '@angular/core';

import { faPlugCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';

@Component({
  selector: 'account-dashboard-device',
  templateUrl: './dashboard-device.component.html',
  styleUrls: ['./dashboard-device.component.scss']
})
export class DashboardDeviceComponent implements OnInit {
    public addDeviceIcon = faPlugCirclePlus;
    public addDeviceUrl = environment.mycroftUrls.account + '/devices/add';

  constructor() { }

  ngOnInit(): void {
  }

}
