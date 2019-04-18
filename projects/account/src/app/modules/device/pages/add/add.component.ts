import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AccountDefaults } from '@account/models/defaults.model';
import { AccountPreferences } from '@account/models/preferences.model';
import { DeviceService } from '@account/http/device.service';

@Component({
  selector: 'account-device-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    public alignVertical: boolean;
    public defaults: AccountDefaults;
    public defaultsForm: FormGroup;
    public deviceForm: FormGroup;
    private mediaWatcher: Subscription;
    public preferencesForm: FormGroup;
    public preferences: AccountPreferences;
    public stepDoneIcon = faCheck;

    constructor(
        private formBuilder: FormBuilder,
        public mediaObserver: MediaObserver,
        private deviceService: DeviceService,
        private route: ActivatedRoute
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }

    ngOnInit() {
        this.getResolverData();
        this.buildForms();
    }

    private buildForms() {
        this.preferencesForm = this.formBuilder.group(
            {
                dateFormat: [null, Validators.required],
                measurementSystem: [null, Validators.required],
                timeFormat: [null, Validators.required],
            }
        );

        this.defaultsForm = this.formBuilder.group(
            {
                city: [null],
                country: [null],
                region: [null],
                timezone: [null],
                wakeWord: [null],
                voice: [null]
            }
        );
        this.deviceForm = this.formBuilder.group(
            {
                city: [this.defaults ? this.defaults.city.name : null, Validators.required],
                name: [null, Validators.required],
                country: [this.defaults ? this.defaults.country.name : null, Validators.required],
                pairingCode: [
                    null,
                    [
                        Validators.required,
                        Validators.maxLength(6),
                        Validators.minLength(6)
                    ]
                ],
                placement: [null],
                region: [this.defaults ? this.defaults.region.name : null, Validators.required],
                timezone: [this.defaults ? this.defaults.timezone.name : null, Validators.required],
                wakeWord: [this.defaults ? this.defaults.wakeWord.displayName : null, Validators.required],
                voice: [this.defaults ? this.defaults.voice.displayName : null, Validators.required]
            }
        );
    }

    getResolverData() {
        this.route.data.subscribe(
            (data: {defaults: AccountDefaults, preferences: AccountPreferences}) => {
                this.preferences = data.preferences;
                this.defaults = data.defaults;
            }
        );
    }

    onDeviceSubmit() {
        this.deviceService.addDevice(this.deviceForm);
    }

    onPreferencesSubmit() {
        this.deviceService.addAccountPreferences(this.preferencesForm).subscribe();
    }

    onDefaultsSubmit() {
        this.deviceService.addAccountDefaults(this.defaultsForm).subscribe();
    }

    onFinished() {
        window.history.back();
    }
}
