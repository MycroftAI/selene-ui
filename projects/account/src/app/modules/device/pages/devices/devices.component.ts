import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountDefaults } from '@account/models/defaults.model';
import { AccountPreferences } from '@account/models/preferences.model';

@Component({
    selector: 'account-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
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
