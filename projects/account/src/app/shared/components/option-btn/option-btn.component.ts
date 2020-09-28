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

import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
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
