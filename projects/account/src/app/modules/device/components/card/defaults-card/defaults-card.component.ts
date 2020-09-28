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

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountDefaults } from '@account/models/defaults.model';
import { DeviceService } from '@account/http/device.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const fiveSeconds = 5000;


@Component({
    selector: 'account-defaults-card',
    templateUrl: './defaults-card.component.html',
    styleUrls: ['./defaults-card.component.scss']
})
export class DefaultsCardComponent implements OnInit {
    @Input() addingDevice = false;
    @Input() defaults: AccountDefaults;
    @Input() defaultsForm: FormGroup;
    private snackbarConfig = new MatSnackBarConfig();

    constructor(
            private deviceService: DeviceService,
            private snackbar: MatSnackBar
    ) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
    }

    onSave() {
        if (this.defaults) {
            this.deviceService.updateAccountDefaults(this.defaultsForm).subscribe(
                () => {
                    this.defaults = this.defaultsForm.value;
                    this.snackbar.open(
                        'Default values saved',
                        null,
                        this.snackbarConfig
                    );
                }
            );
        } else {
            this.deviceService.addAccountDefaults(this.defaultsForm).subscribe(
                () => {
                    this.defaults = this.defaultsForm.value;
                    this.snackbar.open(
                        'Default values saved',
                        null,
                        this.snackbarConfig
                    );
                }
            );
        }
    }
}
