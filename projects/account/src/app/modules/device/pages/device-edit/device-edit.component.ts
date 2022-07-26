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
import { AbstractControl, AsyncValidatorFn, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DeviceService } from '@account/http/device.service';
import { Device } from '@account/models/device.model';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


const fiveSeconds = 5000;

export function sshKeyValidator(deviceService: DeviceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (control.value) {
            return deviceService.validateSshKey(control.value).pipe(
                map((response) => response.isValid ? null : {invalidSshKey: true}),
                catchError(() => null),
            );
        } else {
            return of(null);
        }
    };
}

@Component({
    selector: 'account-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {
    public advancedSettingsDesc: string[];
    public deviceForm: UntypedFormGroup;
    private deviceId: string;
    public device$ = new Observable<Device>();
    public pantacorId: string;
    private snackbarConfig = new MatSnackBarConfig();

    constructor(
            private deviceService: DeviceService,
            private formBuilder: UntypedFormBuilder,
            private route: ActivatedRoute,
            private router: Router,
            private snackbar: MatSnackBar
    ) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
        this.buildAdvancedSettingsDesc();
        this.device$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.deviceService.getDevice(params.get('deviceId'))),
            tap((device) => {
                    this.deviceId = device.id;
                    this.pantacorId = device.pantacorConfig.pantacorId;
                    this.buildDeviceForm(device);
                })
        );
    }

    buildDeviceForm(device) {
        this.deviceForm = this.formBuilder.group(
            {
                city: [device.city.name, Validators.required],
                name: [device.name, Validators.required],
                country: [device.country.name, Validators.required],
                placement: [device.placement],
                region: [device.region.name, Validators.required],
                timezone: [device.timezone.name, Validators.required],
                wakeWord: [device.wakeWord.name, Validators.required],
                voice: [device.voice.displayName, Validators.required],
                autoUpdate: [device.pantacorConfig.autoUpdate],
                releaseChannel: [device.pantacorConfig.releaseChannel],
                sshPublicKey: [device.pantacorConfig.sshPublicKey, [], [ sshKeyValidator(this.deviceService) ]]
            }
        );
    }

    buildAdvancedSettingsDesc() {
        this.advancedSettingsDesc = [
            'Mycroft Core can be further configured ' +
            'for development and experimentation purposes. Example configurations ' +
            'include text-to-speech technologies, speech-to-text technologies and ' +
            'wake word listeners.',
            'These advanced options can be managed by editing a configuration file ' +
            'on the device.  Proceed with caution; a bad configuration file could ' +
            'render your device unusable.',
            'Follow the link below for documentation on the options available ' +
            'and how to edit them.'
        ];
    }

    onExit(save: boolean) {
        if (save) {
            this.deviceService.updateDevice(this.deviceId, this.deviceForm).subscribe(
                () => {
                    this.snackbar.open(
                        'Device ' + this.deviceForm.controls['name'].value + ' updated' ,
                        null,
                        this.snackbarConfig
                    );
                    this.router.navigate(['/devices']);
                },
                () => {
                    this.snackbar.open(
                        'Error updating device',
                        null,
                        this.snackbarConfig
                    );
                }
            );
        } else {
            this.router.navigate(['/devices']);
        }
    }

    navigateToDocs() {
        window.location.assign('https://mycroft.ai/documentation/mycroft-conf/');
    }
}
