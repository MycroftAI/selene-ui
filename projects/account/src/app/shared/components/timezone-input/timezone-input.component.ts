import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';

import { Timezone } from '../../models/timezone.model';

@Component({
    selector: 'account-timezone-input',
    templateUrl: './timezone-input.component.html',
    styleUrls: ['./timezone-input.component.scss']
})
export class TimezoneInputComponent implements OnInit {
    @Input() deviceForm: FormGroup;
    public filteredTimezones$ = new Observable<Timezone[]>();
    @Input() timezones$: Observable<Timezone[]>;
    private timezones: Timezone[];
    private timezoneControl: AbstractControl;

    constructor() { }

    ngOnInit(): void {
        this.timezoneControl = this.deviceForm.controls['timezone'];
    }

    getTimezones() {
        if (!this.timezoneControl.value) {
            this.timezones$.subscribe(
                (timezones) => {
                    this.timezones = timezones;
                    this.timezoneControl.validator = this.timezoneValidator();
                    this.filteredTimezones$ = this.timezoneControl.valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterTimezones(value)),
                        // tap(() => { this.populateTimezone(); })

                    );
                }
            );
        }
    }

    private filterTimezones(value: string): Timezone[] {
        if (value) {
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
