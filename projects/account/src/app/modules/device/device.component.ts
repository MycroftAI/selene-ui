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
                city: [null],
                country: [null],
                name: [null],
                pairingCode: [null],
                placement: [null],
                region: [null],
                timezone: [null],
                wakeWord: [null],
                voice: [null]
            }
        );
        this.preferencesForm = this.formBuilder.group(
            {
                dateFormat: [null, Validators.required],
                measurementSystem: [null, Validators.required],
                timeFormat: [null, Validators.required],
            }
        );

    }
}
