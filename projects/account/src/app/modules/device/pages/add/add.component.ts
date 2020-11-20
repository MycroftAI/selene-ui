/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AccountDefaults } from '@account/models/defaults.model';
import { AccountPreferences } from '@account/models/preferences.model';
import { DeviceService } from '@account/http/device.service';


export function pairingCodeValidator(deviceService: DeviceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return deviceService.validatePairingCode(control.value).pipe(
            map((response) => response.isValid ? null : { unknownPairingCode: true }),
            catchError(() =>  null),
        );
    };
}


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
                    ],
                    [ pairingCodeValidator(this.deviceService) ],
                ],
                placement: [null],
                region: [this.defaults ? this.defaults.region.name : null, Validators.required],
                timezone: [this.defaults ? this.defaults.timezone.name : null, Validators.required],
                wakeWord: [this.defaults ? this.defaults.wakeWord.name : null, Validators.required],
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
