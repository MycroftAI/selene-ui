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

import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import {faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { ProfileService } from '@account/http/profile.service';


@Component({
    selector: 'account-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public hideIcon: IconDefinition = faEyeSlash;
    public passwordControl = new UntypedFormControl(null, [Validators.required]);
    public showIcon: IconDefinition = faEye;
    public showPassword = false;

    constructor(
        private profileService: ProfileService,
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
    ) {
    }

    ngOnInit() {
    }

    changePassword() {
        this.dialogRef.close(this.passwordControl.value);
    }


    onCancel() {
        this.dialogRef.close();
    }

    showHidePassword() {
        this.showPassword = !this.showPassword;
    }
}
