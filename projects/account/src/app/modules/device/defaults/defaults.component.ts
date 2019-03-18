import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { City } from '../../../shared/models/city.model';
import { Country } from '../../../shared/models/country.model';
import { GeographyService } from '../../../core/http/geography_service';
import { OptionButtonsConfig } from '../../../shared/models/option-buttons-config.model';
import { Region } from '../../../shared/models/region.model';
import { Timezone } from '../../../shared/models/timezone.model';

@Component({
    selector: 'account-device-defaults',
    templateUrl: './defaults.component.html',
    styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent implements OnInit {
    public cities$ = new Observable<City[]>();
    public countries$ = new Observable<Country[]>();
    @Input() defaultsForm: FormGroup;
    @Input() deviceSetup: boolean;
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
        this.defaultsForm.controls['region'].disable();
        this.defaultsForm.controls['city'].disable();
        this.defaultsForm.controls['timezone'].disable();
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
            this.defaultsForm.controls['region'].setValue(null);
            this.defaultsForm.controls['timezone'].disable();
            this.defaultsForm.controls['timezone'].setValue(null);
        }
    }

    onRegionSelect(selectedRegion: Region): void {
        if (selectedRegion) {
            this.defaultsForm.controls['city'].enable();
            this.cities$ = this.geoService.getCitiesByRegion(selectedRegion);
        } else {
            this.defaultsForm.controls['city'].disable();
            this.defaultsForm.controls['city'].setValue(null);
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
}
