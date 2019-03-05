import { Component, OnInit } from '@angular/core';

import { DeviceAttribute, DeviceService} from '../../device.service';

@Component({
    selector: 'account-device-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    public deviceGroups: DeviceAttribute[];
    public dialogInstructions = 'Groups are useful to organize multiple ' +
        'devices.  You can reuse device names if they are in different groups.';

    constructor(private deviceService: DeviceService) {
    }

    ngOnInit() {
        // this.deviceGroups = this.deviceService.deviceGroups;
    }
}
