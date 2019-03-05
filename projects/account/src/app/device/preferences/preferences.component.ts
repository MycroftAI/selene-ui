import { Component, OnInit } from '@angular/core';

import { AccountPrefrences, DeviceService } from '../device.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'account-device-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
    public advancedSettingsDesc = [
        'Mycroft Core can be further configured ' +
        'for development and experimentation purposes. Example configurations ' +
        'include text-to-speech technologies, speech-to-text technologies and ' +
        'wake word listeners.',
        'These advanced options can be managed by editing a configuration file ' +
        'on the device.  Proceed with caution; a bad configuration file could ' +
        'render your device unusable.',
        'Follow the link below for documentation on the options available ' +
        'and how to edit them.'
    ];
    public preferences$ = new Observable<AccountPrefrences>();

    constructor(private deviceService: DeviceService) { }

    ngOnInit() {
        this.preferences$ = this.deviceService.getAccountPreferences();
  }

}
