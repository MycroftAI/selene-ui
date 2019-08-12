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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '../../shared/models/city.model';
import { Country } from '../../shared/models/country.model';
import { Region } from '../../shared/models/region.model';
import { Timezone } from '../../shared/models/timezone.model';

const citiesUrl = '/api/cities';
const countriesUrl = '/api/countries';
const regionsUrl = '/api/regions';
const timezonesUrl = '/api/timezones';

@Injectable({providedIn: 'root'})
export class GeographyService {
    constructor(private http: HttpClient) {
    }

    getCountries() {
        return this.http.get<Country[]>(countriesUrl);
    }

    getRegionsByCountry(country: Country) {
        const options = { params: new HttpParams().set('country', country.id) };
        return this.http.get<Region[]>(regionsUrl, options);
    }

    getCitiesByRegion(region: Region) {
        const options = { params: new HttpParams().set('region', region.id) };
        return this.http.get<City[]>(citiesUrl, options);
    }

    getTimezonesByCountry(country: Country) {
        const options = { params: new HttpParams().set('country', country.id) };
        return this.http.get<Timezone[]>(timezonesUrl, options);
    }
}
