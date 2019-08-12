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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map, tap} from 'rxjs/operators';

import { City } from '@account/models/city.model';
import { GeographyService } from '@account/http/geography_service';
import { Region } from '@account/models/region.model';

@Component({
    selector: 'account-city-input',
    templateUrl: './city-input.component.html',
    styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent implements OnDestroy, OnInit {
    @Input() cityControl: AbstractControl;
    @Input() region: Subject<Region>;
    @Input() required: boolean;
    @Output() citySelected = new EventEmitter<City>();
    public cities: City[];
    public filteredCities$ = new Observable<City[]>();

    constructor(private geoService: GeographyService) {
    }

    ngOnInit(): void {
        this.region.subscribe(
            (region) => { this.getCities(region); }
        );
    }

    ngOnDestroy(): void {
        this.region.unsubscribe();
    }

    getCities(region: Region) {
        this.geoService.getCitiesByRegion(region).subscribe(
            (cities) => {
                this.cities = cities;
                this.cityControl.validator = this.cityValidator();
                this.filteredCities$ = this.cityControl.valueChanges.pipe(
                    startWith(''),
                    map((value) => this.filterCities(value)),
                    tap(() => { this.emitSelectedCity(); })

                );
            }
        );
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

    cityValidator(): ValidatorFn {
        return (cityControl: AbstractControl) => {
            let valid = true;
            if (cityControl.value) {
                const foundCity = this.cities.find(
                    (city) => city.name === cityControl.value
                );
                if (!foundCity) {
                    valid = false;
                }
            }
            return valid ? null : {cityNotFound: true};

        };
    }

    emitSelectedCity() {
        if (this.cityControl.valid) {
            if (this.cityControl.value) {
                const foundCity = this.cities.find(
                    (city) => city.name === this.cityControl.value
                );
                this.citySelected.emit(foundCity);
            } else {
                this.citySelected.emit(null);
            }
        } else {
            this.citySelected.emit(null);
        }
    }

}
