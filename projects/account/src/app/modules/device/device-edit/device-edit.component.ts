import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { City } from '../../../shared/models/city.model';
import { Country } from '../../../shared/models/country.model';
import { GeographyService } from '../../../core/http/geography_service';
import { OptionButtonsConfig } from '../../../shared/models/option-buttons-config.model';
import { Region } from '../../../shared/models/region.model';
import { Timezone } from '../../../shared/models/timezone.model';
import { AccountPreferences } from '../../../shared/models/preferences.model';

@Component({
    selector: 'account-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {
    @Input() action: string;
    public cities$ = new Observable<City[]>();
    public countries$ = new Observable<Country[]>();
    @Input() deviceForm: FormGroup;
    @Input() preferences: AccountPreferences;
    public regions$ = new Observable<Region[]>();
    public timezones$ = new Observable<Timezone[]>();
    public voiceOptionsConfig: OptionButtonsConfig;
    public wakeWordOptionsConfig: OptionButtonsConfig;

    constructor(private geoService: GeographyService) {
        this.voiceOptionsConfig = {
            options: ['British Male', 'American Female', 'American Male', 'Google Voice'],
            buttonWidth: '140px'
        };
        this.wakeWordOptionsConfig = {
            options: ['Hey Mycroft', 'Christopher', 'Hey Ezra', 'Hey Jarvis'],
            buttonWidth: '130px'
        };
    }

    ngOnInit() {
        // Disable the controls that depend on other control values to be pre-populated.
        this.deviceForm.controls['region'].disable();
        this.deviceForm.controls['city'].disable();
        this.deviceForm.controls['timezone'].disable();
        this.countries$ = this.geoService.getCountries();
        if (this.action === 'device setup' && this.preferences) {
            this.applyDefaultValues();
        }
    }

    applyDefaultValues() {
        if (this.preferences.geography.country) {
            this.deviceForm.controls['country'].setValue(
                this.preferences.geography.country
            );
        }
        if (this.preferences.geography.region) {
            this.deviceForm.controls['region'].setValue(
                this.preferences.geography.region
            );
        }
        if (this.preferences.geography.city) {
            this.deviceForm.controls['city'].setValue(
                this.preferences.geography.city
            );
        }
        if (this.preferences.geography.timezone) {
            this.deviceForm.controls['timezone'].setValue(
                this.preferences.geography.timezone
            );
        }
    }

    onCountrySelect(selectedCountry: Country): void {
        if (selectedCountry) {
            this.deviceForm.controls['region'].enable();
            this.deviceForm.controls['timezone'].enable();
            this.regions$ = this.geoService.getRegionsByCountry(selectedCountry);
            this.timezones$ = this.geoService.getTimezonesByCountry(selectedCountry);
        } else {
            this.deviceForm.controls['region'].disable();
            this.deviceForm.controls['region'].setValue('');
            this.deviceForm.controls['timezone'].disable();
            this.deviceForm.controls['timezone'].setValue('');
        }
    }

    onRegionSelect(selectedRegion: Region): void {
        if (selectedRegion) {
            this.deviceForm.controls['city'].enable();
            this.cities$ = this.geoService.getCitiesByRegion(selectedRegion);
        } else {
            this.deviceForm.controls['city'].disable();
            this.deviceForm.controls['city'].setValue('');
        }
    }

    onCitySelect(selectedCity: City): void {
        if (selectedCity) {
            this.deviceForm.controls['timezone'].setValue(selectedCity.timezone);
        }
    }

    changeVoice(newValue: string) {
        this.deviceForm.patchValue({voice: newValue});
    }

    changeWakeWord(newValue: string) {
        this.deviceForm.patchValue({wakeWord: newValue});
    }
}
