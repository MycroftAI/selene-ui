import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AccountPreferences } from '../../../../shared/models/preferences.model';
import { DeviceService } from '../../../../core/http/device.service';
import { AccountDefaults } from '../../../../shared/models/defaults.model';

@Component({
  selector: 'account-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss']
})
export class DeviceAddComponent implements OnInit {
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

        // The defaults and device forms must have the same fields because they
        // both use the same component.  The name, pairing code and placement
        // controls are only placeholders in this context to facilitate form re-use.
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
        this.deviceForm = this.formBuilder.group(
            {
                city: [null, Validators.required],
                name: [null, Validators.required],
                country: [null, Validators.required],
                pairingCode: [
                    null,
                    [
                        Validators.required,
                        Validators.maxLength(6),
                        Validators.minLength(6)
                    ]
                ],
                placement: [null],
                region: [null, Validators.required],
                timezone: [null, Validators.required],
                wakeWord: [null, Validators.required],
                voice: [null, Validators.required]
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
}
