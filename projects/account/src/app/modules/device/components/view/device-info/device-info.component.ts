import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@account/models/device.model';

@Component({
    selector: 'account-device-info',
    templateUrl: './device-info.component.html',
    styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
    @Input() device: Device;

    constructor() { }

    ngOnInit() {
  }

}
