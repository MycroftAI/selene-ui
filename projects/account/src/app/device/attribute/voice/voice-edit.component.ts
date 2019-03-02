import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DeviceAttribute, DeviceService} from '../../device.service';


@Component({
  selector: 'account-device-voice-edit',
  templateUrl: './voice-edit.component.html',
  styleUrls: ['./voice-edit.component.scss']
})
export class VoiceEditComponent implements OnInit {
    public deviceVoices: DeviceAttribute[];
    public dialogInstructions = 'Mycroft\'s voice technology is rapidly ' +
        'evolving. Local voices guarantee the most privacy. Premium voices ' +
        'are more natural but require an internet connection.';

    constructor(
        private deviceService: DeviceService,
        public dialogRef: MatDialogRef<VoiceEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string) {
    }

    ngOnInit() {
        this.deviceVoices = this.deviceService.deviceVoices;
    }
}
