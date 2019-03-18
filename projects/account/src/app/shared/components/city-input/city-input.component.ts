import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map, tap} from 'rxjs/operators';

import { City } from '../../models/city.model';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'account-city-input',
    templateUrl: './city-input.component.html',
    styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent implements OnInit {
    @Input() cities$: Observable<City[]>;
    private cities: City[];
    @Input() deviceForm: FormGroup;
    public filteredCities$ = new Observable<City[]>();
    @Output() citySelected = new EventEmitter<City>();
    private cityControl: AbstractControl;

    constructor() {
    }

    ngOnInit() {
        this.cityControl = this.deviceForm.controls['city'];
    }

    getCities() {
        if (!this.cities) {
            this.cities$.subscribe(
                (cities) => {
                    this.cities = cities;
                    this.cityControl.validator = this.cityValidator();
                    this.filteredCities$ = this.cityControl.valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterCities(value)),
                        tap(() => { this.checkForValidCity(); })

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
            return valid ? null : {regionNotFound: true};

        };
    }

    checkForValidCity() {
        if (this.cityControl.valid) {
            this.citySelected.emit(this.cityControl.value);
        }
    }

}
