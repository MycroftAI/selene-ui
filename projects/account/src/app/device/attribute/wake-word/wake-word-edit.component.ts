import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DeviceAttribute, DeviceService} from '../../device.service';


@Component({
  selector: 'account-device-wake-word-edit',
  templateUrl: './wake-word-edit.component.html',
  styleUrls: ['./wake-word-edit.component.scss']
})
export class WakeWordEditComponent implements OnInit {
    public deviceWakeWords: DeviceAttribute[];
    public dialogInstructions = 'Mycroft\'s voice technology is rapidly ' +
        'evolving. Local voices guarantee the most privacy. Premium voices ' +
        'are more natural but require an internet connection.';

    constructor(
        private deviceService: DeviceService,
        public dialogRef: MatDialogRef<WakeWordEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string) {
    }

    ngOnInit() {
        this.deviceWakeWords = this.deviceService.deviceWakeWords;
    }
}
