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

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountPreferences } from '@account/models/preferences.model';
import { DeviceService } from '@account/http/device.service';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'account-device-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
    @Input() deviceSetup: boolean;
    public preferences: AccountPreferences;
    public preferencesForm: FormGroup;
    public measurementOptionsConfig: OptionButtonsConfig;
    public timeFormatOptionsConfig: OptionButtonsConfig;
    public dateFormatOptionsConfig: OptionButtonsConfig;

    constructor(private deviceService: DeviceService, private formBuilder: FormBuilder, private route: ActivatedRoute)   {
        this.dateFormatOptionsConfig = {
            label: 'Date Format',
            options: ['DD/MM/YYYY', 'MM/DD/YYYY'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
        this.measurementOptionsConfig = {
            label: 'Measurement System',
            options: ['Imperial', 'Metric'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
        this.timeFormatOptionsConfig = {
            label: 'Time Format',
            options: ['12 Hour', '24 Hour'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {preferences: AccountPreferences}) => { this.preferences = data.preferences; }
        );
        this.buildForm();
    }

    buildForm() {
        this.preferencesForm = this.formBuilder.group(
            {
                dateFormat: [
                    this.preferences ? this.preferences.dateFormat : null,
                    Validators.required
                ],
                measurementSystem: [
                    this.preferences ? this.preferences.measurementSystem : null,
                    Validators.required
                ],
                timeFormat: [
                    this.preferences ? this.preferences.timeFormat : null,
                    Validators.required
                ],
            }
        );
    }

    onSave() {
        if (this.preferences) {
            this.deviceService.updateAccountPreferences(this.preferencesForm).subscribe(
                () => { this.preferences = this.preferencesForm.value; }
            );
        } else {
            this.deviceService.addAccountPreferences(this.preferencesForm).subscribe(
                () => { this.preferences = this.preferencesForm.value; }
            );
        }
    }
}
