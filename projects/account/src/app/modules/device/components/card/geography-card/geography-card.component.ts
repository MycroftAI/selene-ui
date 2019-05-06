import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Country } from '@account/models/country.model';
import { Region } from '@account/models/region.model';
import { City } from '@account/models/city.model';
import { AccountDefaults } from '@account/models/defaults.model';
import { Subject } from 'rxjs';


@Component({
    selector: 'account-geography-card',
    templateUrl: './geography-card.component.html',
    styleUrls: ['./geography-card.component.scss']
})
export class GeographyCardComponent implements OnInit {
    @Input() geographyRequired: boolean;
    @Input() geoForm: FormGroup;
    @Input() required: boolean;
    public countryControl: AbstractControl;
    public regionControl: AbstractControl;
    public cityControl: AbstractControl;
    public timezoneControl: AbstractControl;
    public selectedCity: City;
    public selectedCountry = new Subject<Country>();
    public selectedRegion = new Subject<Region>();

    constructor() {
    }

    ngOnInit() {
        this.countryControl = this.geoForm.controls['country'];
        this.regionControl = this.geoForm.controls['region'];
        this.cityControl = this.geoForm.controls['city'];
        this.timezoneControl = this.geoForm.controls['timezone'];
        this.cityControl.disable();
        this.regionControl.disable();
        this.timezoneControl.disable();
    }

    onCountrySelect(selectedCountry: Country): void {
        if (selectedCountry) {
            this.selectedCountry.next(selectedCountry);
            this.regionControl.enable();
            this.timezoneControl.enable();
        } else {
            this.cityControl.disable();
            this.cityControl.setValue('');
            this.regionControl.disable();
            this.regionControl.setValue('');
            this.timezoneControl.disable();
            this.timezoneControl.setValue('');
        }
    }

    onRegionSelect(selectedRegion: Region): void {
        if (selectedRegion) {
            this.selectedRegion.next(selectedRegion);
            this.cityControl.enable();
        } else {
            this.cityControl.disable();
            this.cityControl.setValue('');
        }
    }

    onCitySelect(selectedCity: City): void {
        if (selectedCity) {
            this.selectedCity = selectedCity;
            this.timezoneControl.setValue(selectedCity.timezone);
        }
    }


}
