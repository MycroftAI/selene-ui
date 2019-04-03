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
