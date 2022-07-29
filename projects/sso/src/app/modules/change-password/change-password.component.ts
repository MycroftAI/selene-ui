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
import { Observable } from 'rxjs';

import { ApiService } from '../../core/http/api.service';
import { PasswordChangeAccount } from '../../shared/models/password-change-account.model';
import { PasswordResetComponent } from '../login/password-reset/password-reset.component';

const fiveSeconds = 5000;

@Component({
    selector: 'sso-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public account$: Observable<PasswordChangeAccount>;
    public emailControl = new UntypedFormControl(null, [Validators.required, Validators.email]);
    public passwordControl = new UntypedFormControl(null, [Validators.required]);

    constructor(
        private route: ActivatedRoute,
        private authService: ApiService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit() {
        const resetToken = this.route.snapshot.queryParams['token'];
        this.account$ = this.authService.validateResetToken(resetToken);
        console.log(this.emailControl.valid);
    }

    onChangePassword(accountId: string) {
        this.authService.changePassword(accountId, this.passwordControl).subscribe(
            () => { this.router.navigate(['login']); }
        );
    }

    onPasswordReset() {
        const dialogRef = this.dialog.open(
            PasswordResetComponent,
            {width: '320px', data: this.emailControl}
        );
        dialogRef.afterClosed().subscribe(
            () => { this.resetPassword(); }
        );
    }

    resetPassword() {
        const successMessage = 'Password reset instructions sent';
        const errorMessage = 'An error occurred sending the instructions email';
        const snackbarConfig = new MatSnackBarConfig();
        snackbarConfig.duration = fiveSeconds;
        snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.authService.resetPassword(this.emailControl).subscribe(
            () => { this.snackBar.open(successMessage, null, snackbarConfig); },
            () => { this.snackBar.open(errorMessage, null, snackbarConfig); }
        );
    }
}
