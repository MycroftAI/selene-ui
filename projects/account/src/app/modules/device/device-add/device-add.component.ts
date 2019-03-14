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

import { AccountPreferences, DeviceService } from '../../../core/http/device.service';

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
        this.preferencesForm = this.deviceService.buildPreferencesForm(this.preferences);
        this.pairDeviceForm = this.formBuilder.group({
            pairingCode: ['', Validators.required],
        });
        this.deviceForm = this.formBuilder.group(
            {
                name: ['', Validators.required],
                placement: [''],
                country: ['', Validators.required],
                region: ['', Validators.required],
                city: ['', Validators.required],
                timeZone: ['', Validators.required]
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
        console.log('attempting to pair device');
    }
}
