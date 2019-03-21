import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountDefaults } from '../../shared/models/defaults.model';
import { AccountPreferences } from '../../shared/models/preferences.model';

@Component({
    selector: 'account-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
    defaults: AccountDefaults;
    defaultsForm: FormGroup;
    preferences: AccountPreferences;
    preferencesForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {defaults: AccountDefaults, preferences: AccountPreferences}) => {
                this.defaults = data.defaults;
                this.preferences = data.preferences;
            }
        );

        this.defaultsForm = this.formBuilder.group(
            {
                city: [this.defaults ? this.defaults.city : null],
                country: [this.defaults ? this.defaults.country : null],
                name: [null],
                pairingCode: [null],
                placement: [null],
                region: [this.defaults ? this.defaults.region : null],
                timezone: [this.defaults ? this.defaults.timezone : null],
                wakeWord: [this.defaults ? this.defaults.wakeWord : null],
                voice: [this.defaults ? this.defaults.voice : null]
            }
        );
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
}
