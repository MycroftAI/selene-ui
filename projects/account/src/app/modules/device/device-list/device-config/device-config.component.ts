import { Component, Input, OnInit } from '@angular/core';

import { Device } from '../../../../shared/models/device.model';

@Component({
  selector: 'account-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.scss']
})
export class DeviceConfigComponent implements OnInit {
    @Input() device: Device;

  constructor() { }

  ngOnInit() {
  }

}
