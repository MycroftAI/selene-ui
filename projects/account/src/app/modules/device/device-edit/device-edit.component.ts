import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { AccountDefaults } from '../../../shared/models/defaults.model';
import { City } from '../../../shared/models/city.model';
import { Country } from '../../../shared/models/country.model';
import { DeviceService } from '../../../core/http/device.service';
import { GeographyService } from '../../../core/http/geography_service';
import { OptionButtonsConfig } from '../../../shared/models/option-buttons-config.model';
import { Region } from '../../../shared/models/region.model';
import { Timezone } from '../../../shared/models/timezone.model';

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
    @Input() defaults: AccountDefaults;
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
        this.deviceForm = this.formBuilder.group(
            {
                name: [null]
            }
        );
    }

    ngOnInit() {
        // if (!this.deviceForm) {
        //     this.deviceForm = this.formBuilder.group(
        //         {
        //             name: [this.deviceService.selectedDevice.name]
        //         }
        //     );
        // }
        // Disable the controls that depend on other control values to be pre-populated.
        this.deviceForm.controls['region'].disable();
        this.deviceForm.controls['city'].disable();
        this.deviceForm.controls['timezone'].disable();
        this.countries$ = this.geoService.getCountries();
        if (this.action === 'device setup' && this.defaults) {
            this.applyDefaultValues();
        }
    }

    applyDefaultValues() {
        if (this.defaults.country) {
            this.deviceForm.controls['country'].setValue(
                this.defaults.country.name
            );
        }
        if (this.defaults.region) {
            this.deviceForm.controls['region'].setValue(
                this.defaults.region.name
            );
        }
        if (this.defaults.city) {
            this.deviceForm.controls['city'].setValue(
                this.defaults.city.name
            );
        }
        if (this.defaults.timezone) {
            this.deviceForm.controls['timezone'].setValue(
                this.defaults.timezone.name
            );
        }
        if (this.defaults.voice) {
            this.deviceForm.controls['voice'].setValue(
                this.defaults.voice.displayName
            );
        }
        if (this.defaults.wakeWord) {
            this.deviceForm.controls['wakeWord'].setValue(
                this.defaults.wakeWord.wakeWord
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

    onSave() {
        if (this.defaults) {
            this.deviceService.updateAccountDefaults(this.deviceForm).subscribe(
                () => { this.defaults = this.deviceForm.value; }
            );
        } else {
            this.deviceService.addAccountDefaults(this.deviceForm).subscribe(
                () => { this.defaults = this.deviceForm.value; }

            );
        }
    }
}
