import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { City } from '@account/models/city.model';
import { Country } from '@account/models/country.model';
import { DeviceService } from '@account/http/device.service';
import { GeographyService } from '@account/http/geography_service';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { Region } from '@account/models/region.model';
import { Timezone } from '@account/models/timezone.model';

@Component({
    selector: 'account-defaults',
    templateUrl: './defaults.component.html',
    styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent implements OnInit {
    @Input() deviceSetup: boolean;
    public cities$ = new Observable<City[]>();
    public countries$ = new Observable<Country[]>();
    @Input() defaultsForm: FormGroup;
    public regions$ = new Observable<Region[]>();
    public timezones$ = new Observable<Timezone[]>();
    public voiceOptionsConfig: OptionButtonsConfig;
    public wakeWordOptionsConfig: OptionButtonsConfig;

    constructor(
            private deviceService: DeviceService,
            private formBuilder: FormBuilder,
            private geoService: GeographyService
    ) {
        this.voiceOptionsConfig = {
            options: ['British Male', 'American Female', 'American Male', 'Google Voice'],
            buttonWidth: '140px'
        };
        this.wakeWordOptionsConfig = {
            options: ['Hey Mycroft', 'Christopher', 'Hey Ezra', 'Hey Jarvis'],
            buttonWidth: '130px'
        };
        this.defaultsForm = this.formBuilder.group(
            {
                name: [null]
            }
        );
    }

    ngOnInit() {
        this.countries$ = this.geoService.getCountries();
    }

    onCountrySelect(selectedCountry: Country): void {
        if (selectedCountry) {
            this.defaultsForm.controls['region'].enable();
            this.defaultsForm.controls['timezone'].enable();
            this.regions$ = this.geoService.getRegionsByCountry(selectedCountry);
            this.timezones$ = this.geoService.getTimezonesByCountry(selectedCountry);
        } else {
            this.defaultsForm.controls['region'].disable();
            this.defaultsForm.controls['region'].setValue('');
            this.defaultsForm.controls['timezone'].disable();
            this.defaultsForm.controls['timezone'].setValue('');
        }
    }

    onRegionSelect(selectedRegion: Region): void {
        if (selectedRegion) {
            this.defaultsForm.controls['city'].enable();
            this.cities$ = this.geoService.getCitiesByRegion(selectedRegion);
        } else {
            this.defaultsForm.controls['city'].disable();
            this.defaultsForm.controls['city'].setValue('');
        }
    }

    onCitySelect(selectedCity: City): void {
        if (selectedCity) {
            this.defaultsForm.controls['timezone'].setValue(selectedCity.timezone);
        }
    }

    changeVoice(newValue: string) {
        this.defaultsForm.patchValue({voice: newValue});
    }

    changeWakeWord(newValue: string) {
        this.defaultsForm.patchValue({wakeWord: newValue});
    }

    onSave() {
        if (this.deviceSetup) {
            this.deviceService.addAccountDefaults(this.defaultsForm).subscribe();
        } else {
            this.deviceService.updateAccountDefaults(this.defaultsForm).subscribe();
        }
    }
}
