import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, Form, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AccountPreferences, DeviceService } from '../../../core/http/device.service';
import { MatButtonToggleChange } from '@angular/material';

@Component({
    selector: 'account-device-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
    public advancedSettingsDesc: string[];
    @Input() deviceSetup: boolean;
    @Input() preferences: AccountPreferences;
    @Input() preferencesForm: FormGroup;

    constructor(
            private deviceService: DeviceService,
            private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.buildAdvancedSettingsDesc();
    }

    buildAdvancedSettingsDesc() {
        this.advancedSettingsDesc = [
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
    }

    changeDateFormat(newValue: MatButtonToggleChange) {
        this.preferencesForm.patchValue({dateFormat: newValue.value});
    }

    changeMeasurementSystem(newValue: MatButtonToggleChange) {
        this.preferencesForm.patchValue({measurementSystem: newValue.value});
    }

    changeTimeFormat(newValue: MatButtonToggleChange) {
        this.preferencesForm.patchValue({timeFormat: newValue.value});
    }
}
