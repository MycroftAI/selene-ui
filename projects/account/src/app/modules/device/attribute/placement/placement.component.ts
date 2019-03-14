import { Component, OnInit } from '@angular/core';

import { DeviceAttribute } from '../../../../shared/models/deviceAttribute.model';
import { DeviceService} from '../../../../core/http/device.service';


@Component({
  selector: 'account-device-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {
    public devicePlacements: DeviceAttribute[];
    public dialogInstructions = 'You can optionally indicate where a device is ' +
        'placed within a geography.  Field is informational only.';

    constructor(private deviceService: DeviceService) {
    }

    ngOnInit() {
        this.devicePlacements = this.deviceService.devicePlacements;
    }
}
