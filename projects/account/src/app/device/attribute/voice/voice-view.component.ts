import { Component, Input, OnInit } from '@angular/core';

import {Device, DeviceAttribute, DeviceService} from '../../device.service';
import { VoiceEditComponent } from './voice-edit.component';

@Component({
  selector: 'account-device-voice-view',
  templateUrl: './voice-view.component.html',
  styleUrls: ['./voice-view.component.scss']
})
export class VoiceViewComponent implements OnInit {
    @Input() device: Device;
    public deviceVoices: DeviceAttribute[];
    public dialog = VoiceEditComponent;

    constructor( private service: DeviceService) {
    }

    ngOnInit() {
        this.deviceVoices = this.service.deviceVoices;
    }
}
