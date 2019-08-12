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

import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';
import { Region } from '@account/models/region.model';
import { Observable, Subject } from 'rxjs';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { GeographyService } from '@account/http/geography_service';
import { Country } from '@account/models/country.model';

@Component({
    selector: 'account-region-input',
    templateUrl: './region-input.component.html',
    styleUrls: ['./region-input.component.scss']
})
export class RegionInputComponent implements OnDestroy, OnInit {
    @Input() country: Subject<Country>;
    @Input() regionControl: AbstractControl;
    @Input() required: boolean;
    @Output() regionSelected = new EventEmitter<Region>();
    public filteredRegions$: Observable<Region[]>;
    public regions: Region[];

    constructor(private geoService: GeographyService) { }

    ngOnInit(): void {
        this.country.subscribe(
            (country) => { this.getRegions(country); }
        );
    }

    ngOnDestroy(): void {
        this.country.unsubscribe();
    }

    getRegions(country: Country) {
        this.geoService.getRegionsByCountry(country).subscribe(
            (regions) => {
                this.regions = regions;
                this.regionControl.validator = this.regionValidator();
                this.filteredRegions$ = this.regionControl.valueChanges.pipe(
                    startWith(''),
                    map((value) => this.filterRegions(value)),
                    tap(() => {this.emitSelectedRegion(); })
                );
            }
        );
    }

    private filterRegions(value: string): Region[] {
        const filterValue = value ? value.toLowerCase() : '';
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

    regionValidator(): ValidatorFn {
        return (regionControl: AbstractControl) => {
            let valid = true;
            if (regionControl.value) {
                const foundRegion = this.regions.find(
                    (region) => region.name === regionControl.value
                );
                if (!foundRegion) {
                    valid = false;
                }
            }
            return valid ? null : {regionNotFound: true};

        };
    }

    emitSelectedRegion() {
        if (this.regionControl.valid) {
            if (this.regionControl.value) {
                const foundRegion = this.regions.find(
                    (region) => region.name === this.regionControl.value
                );
                this.regionSelected.emit(foundRegion);
            } else {
                this.regionSelected.emit(null);
            }
        } else {
            this.regionSelected.emit(null);
        }
    }

}
