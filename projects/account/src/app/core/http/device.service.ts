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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AccountPreferences } from '@account/models/preferences.model';
import { Device } from '@account/models/device.model';
import { DeviceAttribute } from '@account/models/deviceAttribute.model';
import { FormGroup } from '@angular/forms';
import { AccountDefaults } from '@account/models/defaults.model';
import { Observable } from 'rxjs';

const defaultsUrl = '/api/defaults';
const deviceUrl = '/api/devices';
const geographyUrl = 'api/geographies';
const pairingCodeUrl = '/api/pairing-code';
const preferencesUrl = '/api/preferences';
const softwareUpdateUrl = '/api/software-update';
const sshKeyUrl = '/api/ssh-key';
const voicesUrl = '/api/voices';
const wakeWordUrl = '/api/wake-words';



@Injectable({providedIn: 'root'})
export class DeviceService {
    constructor(private http: HttpClient) {
    }

    getDevices(): Observable<Device[]> {
        return this.http.get<Device[]>(deviceUrl);
    }

    getDevice(deviceId: string): Observable<Device> {
        return this.http.get<Device>(deviceUrl + '/' + deviceId);
    }

    addDevice(deviceForm: FormGroup) {
        this.http.post<any>(deviceUrl, deviceForm.value).subscribe();
    }

    deleteDevice(device: Device): Observable<any> {
        return this.http.delete(deviceUrl + '/' + device.id);
    }

    updateDevice(deviceId: string, deviceForm: FormGroup): Observable<any> {
        return this.http.patch(deviceUrl + '/' + deviceId, deviceForm.value);
    }

    addAccountPreferences(preferencesForm: FormGroup) {
        return this.http.post<any>(preferencesUrl, preferencesForm.value);
    }

    getAccountPreferences() {
        return this.http.get<AccountPreferences>(preferencesUrl);
    }

    updateAccountPreferences(preferencesForm: FormGroup): Observable<any> {
        return this.http.patch<any>(preferencesUrl, preferencesForm.value);
    }

    addAccountDefaults(defaultsForm: FormGroup) {
        return this.http.post<any>(defaultsUrl, defaultsForm.value);
    }

    updateAccountDefaults(defaultsForm: FormGroup) {
        return this.http.patch<any>(defaultsUrl, defaultsForm.value);
    }

    getAccountDefaults() {
        return this.http.get<AccountDefaults>(defaultsUrl);
    }

    validatePairingCode(pairingCode: string): Observable<any> {
        return this.http.get<Observable<any>>(pairingCodeUrl + '/' + pairingCode);
    }

    validateSshKey(sshKey: string): Observable<any> {
        return this.http.get<Observable<any>>(sshKeyUrl, {params: {key: encodeURIComponent(sshKey)}});
    }

    getGeographies() {
        return this.http.get<DeviceAttribute[]>(geographyUrl);
    }

    getVoices() {
        return this.http.get<DeviceAttribute[]>(voicesUrl);
    }

    getWakeWords() {
        return this.http.get<DeviceAttribute[]>(wakeWordUrl);
    }

    applySoftwareUpdate(pantacorUpdateId: string) {
        return this.http.patch<any>(softwareUpdateUrl, {deploymentId: pantacorUpdateId});
    }
}
