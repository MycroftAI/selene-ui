import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';

import { Country } from '../../../../shared/models/country.model';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'account-country-input',
    templateUrl: './country-input.component.html',
    styleUrls: ['./country-input.component.scss']
})
export class CountryInputComponent implements OnInit {
    @Input() countries$: Observable<Country[]>;
    private countries: Country[];
    private countryControl: AbstractControl;
    @Output() countrySelected = new EventEmitter<Country>();
    @Input() deviceForm: FormGroup;
    public filteredCountries$: Observable<Country[]>;
    @Input() required: boolean;

    constructor() { }

    ngOnInit() {
        this.countryControl = this.deviceForm.controls['country'];
    }

    getCountries() {
        if (!this.countries) {
            this.countries$.subscribe(
                (countries) => {
                    this.countries = countries;
                    this.countryControl.validator = this.countryValidator();
                    this.filteredCountries$ = this.countryControl.valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterCountries(value)),
                        tap(() => { this.checkForValidCountry(); })
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

    countryValidator(): ValidatorFn {
        return (countryControl: AbstractControl) => {
            let valid = true;
            if (countryControl.value) {
                const foundCountry = this.countries.find(
                    (country) => country.name === countryControl.value
                );
                if (!foundCountry) {
                    valid = false;
                }
            }
            return valid ? null : {countryNotFound: true};

        };
    }

    checkForValidCountry() {
        if (this.countryControl.valid) {
            if (this.countryControl.value) {
                const foundCountry = this.countries.find(
                    (country) => country.name === this.countryControl.value
                );
                this.countrySelected.emit(foundCountry);
            } else {
                this.countrySelected.emit(null);
            }
        } else {
            this.countrySelected.emit(null);
        }
    }

}
