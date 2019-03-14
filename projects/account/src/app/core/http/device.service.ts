import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const deviceUrl = '/api/devices';
const geographyUrl = 'api/geographies';
const preferencesUrl = '/api/preferences';
const voicesUrl = '/api/voices';
const wakeWordUrl = '/api/wake-words';

export interface DeviceAttribute {
    id?: string;
    name: string;
    userDefined: boolean;
}

export interface Geography {
    latitude: number;
    longitude: number;
    country: string;
    region: string;
    city: string;
    timezone: string;
}
export interface Device {
    coreVersion: string;
    enclosureVersion: string;
    id: string;
    geography: DeviceAttribute;
    name: string;
    placement: DeviceAttribute;
    platform: string;
    voice: DeviceAttribute;
    wakeWord: DeviceAttribute;
}

export interface AccountPreferences {
    dateFormat: string;
    geography: Geography;
    location: DeviceAttribute;
    measurementSystem: string;
    timeFormat: string;
    voice: DeviceAttribute;
    wakeWord: DeviceAttribute;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
    public devices: Device[] = [
        {
            coreVersion: '18.08',
            enclosureVersion: '1.2.3',
            id:  'abc-def-ghi',
            geography: {id: '1a2b-3c4d-5e6f', name: 'United States, 64101, CST', userDefined: false},
            name: 'Mark',
            placement: {id: 'bbb-bbb-bbb', name: 'Living Room', userDefined: false},
            platform: 'mark-one',
            voice: {id: '1a2b-3c4d-5e6f', name: 'British Male', userDefined: true},
            wakeWord: {id: '1a2b-3c4d-5e6f', name: 'Hey Mycroft', userDefined: true},
        },
        {
            coreVersion: '18.08',
            enclosureVersion: '1.2.3',
            id:  'bcd-efg-hij',
            geography: {id: '1a2b-3c4d-5e6f', name: 'United States, 64101, CST', userDefined: false},
            name: 'Marky Mark',
            placement: {id: 'bbb-bbb-bbb', name: 'Kitchen', userDefined: true},
            platform: 'mark-two',
            voice: {id: '1a2b-3c4d-5e6f', name: 'British Male', userDefined: true},
            wakeWord: {id: 'a1b2-c3d4-e5f6', name: 'Christopher', userDefined: true}
        },
        {
            coreVersion: '18.08',
            enclosureVersion: '1.2.3',
            id:  'cde-fgh-ijk',
            geography: {id: '1a2b-3c4d-5e6f', name: 'United States, 64101, CST', userDefined: false},
            name: 'American Pie',
            placement: {id: 'ddd-ddd-ddd', name: 'Bedroom', userDefined: true},
            platform: 'picroft',
            voice: {id: '1a2b-3c4d-5e6f', name: 'British Male', userDefined: true},
            wakeWord: {id: 'a1b2-c3d4-e5f6', name: 'Christopher', userDefined: true}
        },
        {
            coreVersion: '18.08',
            enclosureVersion: '1.2.3',
            id:  'def-ghi-jkl',
            geography: {id: '1a2b-3c4d-5e6f', name: 'United States, 64101, CST', userDefined: false},
            name: 'Kappa Delta Epsilon',
            placement: {id: 'fff-fff-fff', name: 'Kitchen', userDefined: true},
            platform: 'kde',
            voice: {id: '1a2b-3c4d-5e6f', name: 'British Male', userDefined: true},
            wakeWord: {id: 'abcd-efgh-ijkl', name: 'Hey Jarvis', userDefined: true}
        }
    ];

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
