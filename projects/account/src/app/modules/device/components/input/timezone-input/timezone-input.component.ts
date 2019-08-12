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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Timezone } from '@account/models/timezone.model';
import { GeographyService } from '@account/http/geography_service';
import { Country } from '@account/models/country.model';

@Component({
    selector: 'account-timezone-input',
    templateUrl: './timezone-input.component.html',
    styleUrls: ['./timezone-input.component.scss']
})
export class TimezoneInputComponent implements OnDestroy, OnInit {
    @Input() country: Subject<Country>;
    @Input() required: boolean;
    @Input() timezoneControl: AbstractControl;
    public filteredTimezones$ = new Observable<Timezone[]>();
    private timezones: Timezone[];

    constructor(private geoService: GeographyService) { }

    ngOnInit(): void {
        this.country.subscribe(
            (country) => { this.getTimezones(country); }
        );
    }

    ngOnDestroy(): void {
        this.country.unsubscribe();
    }

    getTimezones(country: Country): void {
        this.geoService.getTimezonesByCountry(country).subscribe(
            (timezones) => {
                this.timezones = timezones;
                this.timezoneControl.validator = this.timezoneValidator();
                this.filteredTimezones$ = this.timezoneControl.valueChanges.pipe(
                    startWith(''),
                    map((value) => this.filterTimezones(value)),

                );
            }
        );
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

    timezoneValidator(): ValidatorFn {
        return (timezoneControl: AbstractControl) => {
            let valid = true;
            if (timezoneControl.value) {
                const foundTimezone = this.timezones.find(
                    (timezone) => timezone.name === timezoneControl.value
                );
                if (!foundTimezone) {
                    valid = false;
                }
            }
            return valid ? null : {timezoneNotFound: true};

        };
    }

}
