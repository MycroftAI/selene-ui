import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AccountPreferences } from '../../shared/models/preferences.model';
import { Device } from '../../shared/models/device.model';
import { DeviceAttribute } from '../../shared/models/deviceAttribute.model';

const deviceUrl = '/api/devices';
const geographyUrl = 'api/geographies';
const preferencesUrl = '/api/preferences';
const voicesUrl = '/api/voices';
const wakeWordUrl = '/api/wake-words';



@Injectable({providedIn: 'root'})
export class DeviceService {
    public devicePlacements: DeviceAttribute[] = [
        {id: '1', name: 'None', userDefined: true},
        {id: null, name: 'Bedroom', userDefined: true},
        {id: null, name: 'Kitchen', userDefined: true},
        {id: '2', name: 'Living Room', userDefined: false}
    ];

    constructor(private http: HttpClient) {
    }

    getDevices() {
        return this.http.get<Device[]>(deviceUrl);
    }

    deleteDevice(device: Device): void {
        console.log('deleting device... ');
    }

    getAccountPreferences() {
        return this.http.get<AccountPreferences>(preferencesUrl);
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
