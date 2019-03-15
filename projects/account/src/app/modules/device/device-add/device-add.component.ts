import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AccountPreferences } from '../../../shared/models/preferences.model';
import { DeviceService } from '../../../core/http/device.service';

@Component({
  selector: 'account-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss']
})
export class DeviceAddComponent implements OnInit {
    public alignVertical: boolean;
    public deviceForm: FormGroup;
    private mediaWatcher: Subscription;
    public pairingCodeControl: AbstractControl;
    public pairDeviceForm: FormGroup;
    public preferencesForm: FormGroup;
    public defaultsForm: FormGroup;
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
        this.getAccountPreferences();
        this.buildForms();
        this.setControlFormAliases();
    }

    private buildForms() {
        this.pairDeviceForm = this.formBuilder.group({
            pairingCode: [
                null,
                [
                    Validators.required,
                    Validators.maxLength(6),
                    Validators.minLength(6)
                ]
            ],
        });
        this.preferencesForm = this.formBuilder.group(
            {
                dateFormat: [null, Validators.required],
                measurementSystem: [null, Validators.required],
                timeFormat: [null, Validators.required],
            }
        );
        this.defaultsForm = this.formBuilder.group(
            {
                country: [null],
                region: [null],
                city: [null],
                timezone: [null],
                wakeWord: [null],
                voice: [null]
            }
        );
        this.deviceForm = this.formBuilder.group(
            {
                name: [null, Validators.required],
                placement: [null],
                country: [null, Validators.required],
                region: [null, Validators.required],
                city: [null, Validators.required],
                timeZone: [null, Validators.required]
            }
        );
    }

    getAccountPreferences() {
        this.route.data.subscribe(
            (data: {preferences: AccountPreferences}) => {
                this.preferences = data.preferences;
            }
        );
    }

    private setControlFormAliases() {
        this.pairingCodeControl = this.pairDeviceForm.controls['pairingCode'];
    }

    onPairingSubmit() {
        console.log('attempting to pair device');
    }

    onPreferencesSubmit() {
        console.log('preferences set');
    }

    onDefaultsSubmit() {
        console.log('defaults set');
    }
}
