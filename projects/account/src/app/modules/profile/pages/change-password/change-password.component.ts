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
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import {faEye, faEyeSlash, faUserSecret, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { ProfileService } from '@account/http/profile.service';
import { SnackbarComponent } from 'shared';

const fiveSeconds = 5000;

@Component({
    selector: 'account-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public changePasswordIcon: IconDefinition = faUserSecret;
    public hideIcon: IconDefinition = faEyeSlash;
    public passwordControl = new UntypedFormControl(null, [Validators.required]);
    public showIcon: IconDefinition = faEye;
    public showPassword = false;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private snackbar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onChangePassword() {
        this.profileService.changePassword(this.passwordControl).subscribe({
            next: () => { this.openSuccessSnackbar(); },
            error: () => { this.openErrorSnackbar(); }
        });
    }

    openErrorSnackbar() {
        const config = new MatSnackBarConfig();
        config.data = {type: 'error', message: 'An error occurred changing the password'};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

    openSuccessSnackbar() {
        const config = new MatSnackBarConfig();
        config.duration = fiveSeconds;
        config.data = {type: 'success', message: 'Password successfully changed'};
        const successSnackbar = this.snackbar.openFromComponent(SnackbarComponent, config);
        successSnackbar.afterDismissed().subscribe(
            () => { this.router.navigate(['/profile']); }
        );
    }

    onCancel() {
        this.router.navigate(['/profile']);
    }

    showHidePassword() {
        this.showPassword = !this.showPassword;
    }
}
