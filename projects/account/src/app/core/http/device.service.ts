import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountPreferences } from '../../shared/models/preferences.model';
import { Device } from '../../shared/models/device.model';
import { DeviceAttribute } from '../../shared/models/deviceAttribute.model';

const deviceUrl = '/api/devices';
const geographyUrl = 'api/geographies';
const preferencesUrl = '/api/preferences';
const voicesUrl = '/api/voices';
const wakeWordUrl = '/api/wake-words';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
    public devicePlacements: DeviceAttribute[] = [
        { id: '1', name: 'None', userDefined: true},
        { id: null, name: 'Bedroom', userDefined: true},
        { id: null, name: 'Kitchen', userDefined: true},
        { id: '2', name: 'Living Room', userDefined: false}
    ];

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

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

    /**
     * Building this form object here because it is used in device setup and preference editing
     */
    buildPreferencesForm(preferences: AccountPreferences): FormGroup {
        const geographyGroup = this.formBuilder.group(
            {
                country: [preferences ? preferences.geography.country : null],
                region: [preferences ? preferences.geography.region : null],
                city: [preferences ? preferences.geography.city : null],
                timezone: [preferences ? preferences.geography.timezone : null],
                latitude: [preferences ? preferences.geography.latitude : null],
                longitude: [preferences ? preferences.geography.longitude : null]
            }
        );
        return this.formBuilder.group(
            {
                dateFormat: [
                    preferences ? preferences.dateFormat : null,
                    Validators.required
                ],
                measurementSystem: [
                    preferences ? preferences.measurementSystem : null,
                    Validators.required
                ],
                timeFormat: [
                    preferences ? preferences.timeFormat : null,
                    Validators.required
                ],
                geography: geographyGroup,
                voice: [preferences ? preferences.voice : null],
                wakeWord: [preferences ? preferences.wakeWord : null]
            }
        );
    }

}
