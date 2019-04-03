import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs';

import { AppService, PasswordChangeAccount } from '../app.service';
import { PasswordResetComponent } from '../login/internal-login/password-reset/password-reset.component';

const fiveSeconds = 5000;

@Component({
    selector: 'sso-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public account$: Observable<PasswordChangeAccount>;
    public emailControl = new FormControl(null, [Validators.required, Validators.email]);
    public passwordControl = new FormControl(null, [Validators.required]);

    constructor(
        private route: ActivatedRoute,
        private authService: AppService,
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
