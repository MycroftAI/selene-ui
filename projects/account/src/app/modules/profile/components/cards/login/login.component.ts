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

import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { faAddressCard, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Account } from '@account/models/account.model';
import { ChangePasswordComponent } from '@account/app/modules/profile/components/views/change-password/change-password.component';
import { ProfileService } from '@account/http/profile.service';
import { SnackbarComponent } from 'shared';

const fiveSeconds = 5000;

@Component({
    selector: 'account-login-edit',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() account: Account;
    public loginIcon: IconDefinition = faAddressCard;

    constructor(
        private profileService: ProfileService,
        public passwordDialog: MatDialog,
        private snackbar: MatSnackBar
    ) { }

    onPasswordChange() {
        this.openPasswordDialog();
    }

    openPasswordDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.restoreFocus = true;
        const dialogRef = this.passwordDialog.open(ChangePasswordComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (newPassword) => {
                if (newPassword) {
                    this.updatePassword(newPassword);
                }}
        );
    }

    updatePassword (newPassword) {
        this.profileService.changePassword(newPassword).subscribe({
            next: () => { this.openSuccessSnackbar(); },
            error: () => { this.openErrorSnackbar(); }
        });
    }

    openErrorSnackbar() {
        const config = new MatSnackBarConfig();
        config.duration = fiveSeconds;
        config.data = {type: 'error', message: 'An error occurred changing the password'};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

    openSuccessSnackbar() {
        const config = new MatSnackBarConfig();
        config.duration = fiveSeconds;
        config.data = {type: 'success', message: 'Password successfully changed'};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }
}

