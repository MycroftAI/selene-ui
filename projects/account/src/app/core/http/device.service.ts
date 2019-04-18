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
const preferencesUrl = '/api/preferences';
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

    getGeographies() {
        return this.http.get<DeviceAttribute[]>(geographyUrl);
    }

    getVoices() {
        return this.http.get<DeviceAttribute[]>(voicesUrl);
    }

    getWakeWords() {
        return this.http.get<DeviceAttribute[]>(wakeWordUrl);
    }
}
