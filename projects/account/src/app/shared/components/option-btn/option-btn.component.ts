import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { MatButtonToggleGroup } from '@angular/material';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'account-option-btn',
    templateUrl: './option-btn.component.html',
    styleUrls: ['./option-btn.component.scss'],
     providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionBtnComponent),
      multi: true
    }
  ]
})
export class OptionBtnComponent implements ControlValueAccessor {
    @Input() config: OptionButtonsConfig;
    @Input() disabled = false;
    @ViewChild(MatButtonToggleGroup) options: MatButtonToggleGroup;
    public onChange;
    public onTouched;
    constructor() {
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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
      }
}
