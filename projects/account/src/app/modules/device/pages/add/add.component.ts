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
    UntypedFormBuilder,
    UntypedFormGroup,
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
            catchError(() => null),
        );
    };
}


export function deviceNameValidator(deviceService: DeviceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return deviceService.getDevices().pipe(
            map((response) =>
                response.filter(device => device.name === control.value).length > 0 ? {duplicateDeviceName: true} : null
            ),
            catchError(() => null),
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
    public defaultsForm: UntypedFormGroup;
    public deviceForm: UntypedFormGroup;
    private mediaWatcher: Subscription;
    public preferencesForm: UntypedFormGroup;
    public preferences: AccountPreferences;
    public stepDoneIcon = faCheck;

    constructor(
        private formBuilder: UntypedFormBuilder,
        public mediaObserver: MediaObserver,
        private deviceService: DeviceService,
        private route: ActivatedRoute
    ) {
        this.mediaWatcher = mediaObserver.asObservable().subscribe(
            (change: MediaChange[]) => {
                change.forEach((item) => {
                    this.alignVertical = ['xs', 'sm'].includes(item.mqAlias);
                });
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
                name: [null, [ Validators.required ], [ deviceNameValidator(this.deviceService) ]],
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

        // Sometimes the defaults are not null but the values within them are null.
        if (!this.deviceForm.controls['wakeWord'].value) {
            this.deviceForm.controls['wakeWord'].setValue('Hey Mycroft');
        }
        if (!this.deviceForm.controls['voice'].value) {
            this.deviceForm.controls['voice'].setValue('American Male');
        }
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
        this.deviceForm.patchValue(
            {
                city: this.defaultsForm.controls['city'].value,
                country: this.defaultsForm.controls['country'].value,
                region: this.defaultsForm.controls['region'].value,
                timezone: this.defaultsForm.controls['timezone'].value,
                wakeWord: this.defaultsForm.controls['wakeWord'].value,
                voice: this.defaultsForm.controls['voice'].value
            }
        );

        // Hack to get around not allowing a user to select a wake word or voice.
        // If this functionality is restored, this code should be removed.
        if (!this.deviceForm.controls['wakeWord'].value) {
            this.deviceForm.controls['wakeWord'].setValue('Hey Mycroft');
        }
        if (!this.deviceForm.controls['voice'].value) {
            this.deviceForm.controls['voice'].setValue('American Male');
        }
    }

    onFinished() {
        window.history.back();
    }
}
