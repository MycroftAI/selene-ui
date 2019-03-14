import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DeviceAttribute, DeviceService} from '../../../../core/http/device.service';


@Component({
  selector: 'account-device-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss']
})
export class VoiceComponent implements OnInit {
    @Input() currentValue: DeviceAttribute;
    public voices$ = new Observable<DeviceAttribute[]>();
    public dialogInstructions = 'Mycroft\'s voice technology is rapidly ' +
        'evolving. Local voices guarantee the most privacy. Premium voices ' +
        'are more natural but require an internet connection.';

    constructor(private deviceService: DeviceService) {
    }

    ngOnInit() {
        this.voices$ = this.deviceService.getVoices();
    }
}
