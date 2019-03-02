import { Component, Input, OnInit } from '@angular/core';

import {Device, DeviceAttribute, DeviceService} from '../../device.service';
import { WakeWordEditComponent} from './wake-word-edit.component';

@Component({
  selector: 'account-device-wake-word-view',
  templateUrl: './wake-word-view.component.html',
  styleUrls: ['./wake-word-view.component.scss']
})
export class WakeWordViewComponent implements OnInit {
    @Input() device: Device;
    public deviceWakeWords: DeviceAttribute[];
    public dialog = WakeWordEditComponent;

    constructor( private service: DeviceService) {
    }

    ngOnInit() {
        this.deviceWakeWords = this.service.deviceVoices;
    }
}
