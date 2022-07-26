/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
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
    @Input() geoForm: UntypedFormGroup;
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
