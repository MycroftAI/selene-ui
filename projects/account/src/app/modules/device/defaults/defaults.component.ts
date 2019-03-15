import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

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
    @Input() defaultsForm: FormGroup;
    @Input() deviceSetup: boolean;
    public voiceOptionsConfig: OptionButtonsConfig;
    public wakeWordOptionsConfig: OptionButtonsConfig;
    public cities: City[];
    public countries: Country[];
    public regions: Region[];
    public timezones: Timezone[];
    public filteredCities$: Observable<City[]>;
    public filteredCountries$: Observable<Country[]>;
    public filteredRegions$: Observable<Region[]>;
    public filteredTimezones$: Observable<Timezone[]>;

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
    }


    getCountries() {
        if (!this.countries) {
            this.geoService.getCountries().subscribe(
                (countries) => {
                    this.countries = countries;
                    this.defaultsForm.controls['country'].validator = this.geographyValidator(this.countries);
                    this.filteredCountries$ = this.defaultsForm.controls['country'].valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterCountries(value)),
                        tap(() => { this.toggleCountryDependentControls(); })
                    );
                }
            );
        }
    }

    private filterCountries(value: string): Country[] {
        const filterValue = value.toLowerCase();
        let filteredCountries: Country[];

        if (this.countries) {
            filteredCountries = this.countries.filter(
                (country) => country.name.toLowerCase().includes(filterValue)
            );
        } else {
            filteredCountries = [];
        }

        return filteredCountries;
    }

    getRegions() {
        const country = this.countries.find(
            (cntry) => cntry.name === this.defaultsForm.controls['country'].value
        );
        if (!this.regions) {
            this.geoService.getRegionsByCountry(country).subscribe(
                (regions) => {
                    this.regions = regions;
                    this.defaultsForm.controls['region'].validator = this.geographyValidator(this.regions);
                    this.filteredRegions$ = this.defaultsForm.controls['region'].valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterRegions(value)),
                        tap(() => { this.toggleCityControl(); })
                    );
                }
            );
        }
    }

    private filterRegions(value: string): Region[] {
        const filterValue = value.toLowerCase();
        let filteredRegions: Region[];

        if (this.regions) {
            filteredRegions = this.regions.filter(
                (region) => region.name.toLowerCase().includes(filterValue)
            );
        } else {
            filteredRegions = [];
        }

        return filteredRegions;
    }

    getCities() {
        const region = this.regions.find(
            (rgn) => rgn.name === this.defaultsForm.controls['region'].value
        );
        if (!this.cities) {
            this.geoService.getCitiesByRegion(region).subscribe(
                (cities) => {
                    this.cities = cities;
                    this.defaultsForm.controls['city'].validator = this.geographyValidator(this.cities);
                    this.filteredCities$ = this.defaultsForm.controls['city'].valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterCities(value)),
                        tap(() => { this.populateTimezone(); })

                    );
                }
            );
        }
    }

    private filterCities(value: string): City[] {
        const filterValue = value.toLowerCase();
        let filteredCities: City[];

        if (this.cities) {
            filteredCities = this.cities.filter(
                (cty) => cty.name.toLowerCase().includes(filterValue)
            );
        } else {
            filteredCities = [];
        }

        return filteredCities;
    }

    populateTimezone() {
        if (this.defaultsForm.controls['city'].value && this.defaultsForm.controls['city'].valid) {
            const foundCity = this.cities.find(
                (cty) => cty.name === this.defaultsForm.controls['city'].value
            );

            this.defaultsForm.controls['timezone'].setValue(foundCity.timezone);
        }

    }

    getTimezones() {
        const country = this.countries.find(
            (cntry) => cntry.name === this.defaultsForm.controls['country'].value
        );
        if (!this.cities) {
            this.geoService.getTimezonesByCountry(country).subscribe(
                (cities) => {
                    this.timezones = cities;
                    this.defaultsForm.controls['timezone'].validator = this.geographyValidator(this.timezones);
                    this.filteredTimezones$ = this.defaultsForm.controls['timezone'].valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterTimezones(value)),
                        tap(() => { this.populateTimezone(); })

                    );
                }
            );
        }
    }

    private filterTimezones(value: string): Timezone[] {
        const filterValue = value.toLowerCase();
        let filteredTimezones: Timezone[];

        if (this.timezones) {
            filteredTimezones = this.timezones.filter(
                (tz) => tz.name.toLowerCase().includes(filterValue)
            );
        } else {
            filteredTimezones = [];
        }

        return filteredTimezones;
    }

    geographyValidator(geographies: any[]): ValidatorFn {
        return (geographyControl: AbstractControl) => {
            let valid = true;
            if (geographyControl.value) {
                const foundGeography = geographies.find(
                    (geography) => geography.name === geographyControl.value
                );
                if (!foundGeography) {
                    valid = false;
                }
            }
            return valid ? null : {geographyNotFound: true};

        };
    }

    toggleCountryDependentControls() {
        if (this.defaultsForm.controls['country'].value && this.defaultsForm.controls['country'].valid) {
            this.defaultsForm.controls['region'].enable();
            this.defaultsForm.controls['timezone'].enable();
        } else {
            this.defaultsForm.controls['region'].disable();
            this.defaultsForm.controls['region'].setValue(null);
            this.regions = null;
            this.defaultsForm.controls['timezone'].disable();
            this.defaultsForm.controls['timezone'].setValue(null);
        }
    }

    toggleCityControl() {
        if (this.defaultsForm.controls['region'].value && this.defaultsForm.controls['region'].valid) {
            this.defaultsForm.controls['city'].enable();
        } else {
            this.defaultsForm.controls['city'].disable();
            this.defaultsForm.controls['city'].setValue(null);
            this.cities = null;
        }
    }

    changeVoice(newValue: string) {
        this.defaultsForm.patchValue({voice: newValue});
    }

    changeWakeWord(newValue: string) {
        this.defaultsForm.patchValue({wakeWord: newValue});
    }
}
