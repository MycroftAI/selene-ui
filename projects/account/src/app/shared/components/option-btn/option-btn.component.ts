import { Component, Input, Self, ViewChild } from '@angular/core';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { MatButtonToggleGroup } from '@angular/material';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'account-option-btn',
    templateUrl: './option-btn.component.html',
    styleUrls: ['./option-btn.component.scss']
})
export class OptionBtnComponent implements ControlValueAccessor {
    @Input() config: OptionButtonsConfig;
    @ViewChild(MatButtonToggleGroup) options: MatButtonToggleGroup;
    public onChange;
    public onTouched;
    constructor(@Self() public controlDirective: NgControl) {
        controlDirective.valueAccessor = this;
    }

    writeValue(value: any) {
        this.options.value = value;
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }
}
