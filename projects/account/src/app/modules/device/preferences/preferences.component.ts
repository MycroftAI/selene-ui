import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material';

import { AccountPreferences } from '../../../shared/models/preferences.model';
import { OptionButtonsConfig } from '../../../shared/models/option-buttons-config.model';

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
    public measurementOptionsConfig: OptionButtonsConfig;
    public timeFormatOptionsConfig: OptionButtonsConfig;
    public dateFormatOptionsConfig: OptionButtonsConfig;

    constructor() {
        this.dateFormatOptionsConfig = {
            label: 'Date Format',
            options: ['DD/MM/YYYY', 'MM/DD/YYYY'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
        this.measurementOptionsConfig = {
            label: 'Measurement System',
            options: ['Imperial', 'Metric'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
        this.timeFormatOptionsConfig = {
            label: 'Time Format',
            options: ['12 Hour', '24 Hour'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
    }

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

    changeDateFormat(newValue: string) {
        this.preferencesForm.patchValue({dateFormat: newValue});
    }

    changeMeasurementSystem(newValue: string) {
        this.preferencesForm.patchValue({measurementSystem: newValue});
    }

    changeTimeFormat(newValue: string) {
        this.preferencesForm.patchValue({timeFormat: newValue});
    }
}
