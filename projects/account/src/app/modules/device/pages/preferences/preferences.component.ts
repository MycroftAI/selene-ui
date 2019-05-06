import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountPreferences } from '@account/models/preferences.model';
import { DeviceService } from '@account/http/device.service';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'account-device-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
    @Input() deviceSetup: boolean;
    public preferences: AccountPreferences;
    public preferencesForm: FormGroup;
    public measurementOptionsConfig: OptionButtonsConfig;
    public timeFormatOptionsConfig: OptionButtonsConfig;
    public dateFormatOptionsConfig: OptionButtonsConfig;

    constructor(private deviceService: DeviceService, private formBuilder: FormBuilder, private route: ActivatedRoute)   {
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
        this.route.data.subscribe(
            (data: {preferences: AccountPreferences}) => { this.preferences = data.preferences; }
        );
        this.buildForm();
    }

    buildForm() {
        this.preferencesForm = this.formBuilder.group(
            {
                dateFormat: [
                    this.preferences ? this.preferences.dateFormat : null,
                    Validators.required
                ],
                measurementSystem: [
                    this.preferences ? this.preferences.measurementSystem : null,
                    Validators.required
                ],
                timeFormat: [
                    this.preferences ? this.preferences.timeFormat : null,
                    Validators.required
                ],
            }
        );
    }

    onSave() {
        if (this.preferences) {
            this.deviceService.updateAccountPreferences(this.preferencesForm).subscribe(
                () => { this.preferences = this.preferencesForm.value; }
            );
        } else {
            this.deviceService.addAccountPreferences(this.preferencesForm).subscribe(
                () => { this.preferences = this.preferencesForm.value; }
            );
        }
    }
}
