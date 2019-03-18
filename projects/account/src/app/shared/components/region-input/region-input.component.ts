import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';
import { Region } from '../../models/region.model';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'account-region-input',
    templateUrl: './region-input.component.html',
    styleUrls: ['./region-input.component.scss']
})
export class RegionInputComponent implements OnInit {
    @Input() deviceForm: FormGroup;
    @Input() filteredRegions$: Observable<Region[]>;
    @Input() regions$: Observable<Region[]>;
    private regions: Region[];
    private regionControl: AbstractControl;
    @Output() regionSelected = new EventEmitter<Region>();

    constructor() { }

    ngOnInit() {
        this.regionControl = this.deviceForm.controls['region'];
    }

    getRegions() {
        if (!this.regionControl.value) {
            this.regions$.subscribe(
                (regions) => {
                    this.regions = regions;
                    this.regionControl.validator = this.regionValidator();
                    this.filteredRegions$ = this.regionControl.valueChanges.pipe(
                        startWith(''),
                        map((value) => this.filterRegions(value)),
                        tap(() => {this.checkForValidRegion(); })
                    );
                }
            );
        }
    }

    private filterRegions(value: string): Region[] {
        if (value) {
            const filterValue = value.toLowerCase();
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

    checkForValidRegion() {
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
