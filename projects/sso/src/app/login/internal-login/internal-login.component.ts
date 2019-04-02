import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { AppService } from '../../app.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const noDelay = 0;
const fiveSeconds = 5000;

@Component({
  selector: 'sso-internal-login',
  templateUrl: './internal-login.component.html',
  styleUrls: ['./internal-login.component.scss']
})
export class InternalLoginComponent implements OnInit {
    public emailControl: AbstractControl;
    public loginForm: FormGroup;
    public passwordControl: AbstractControl;

    constructor(
        private authService: AppService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.buildLoginForm();
    }

    buildLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, Validators.required]
        });
        this.emailControl = this.loginForm.controls['email'];
        this.passwordControl = this.loginForm.controls['password'];
    }

    authorizeUser(): void {
        this.authService.authorizeInternal(this.loginForm).subscribe(
            (response) => { this.authService.navigateToRedirectURI(noDelay); },
            (response) => { this.onAuthFailure(response); }
        );
    }

    onAuthFailure(authorizeUserResponse): void {
        if (authorizeUserResponse.status === 401) {
            this.snackBar.open(
                'Authentication error, please try again',
                null,
                {panelClass: 'mycroft-no-action-snackbar', duration: fiveSeconds}
            );
        }
    }

    onPasswordReset() {
        const dialogRef = this.dialog.open(
            PasswordResetComponent,
            {width: '320px', data: this.loginForm.controls['email']}
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
        this.authService.resetPassword(this.loginForm.controls['email']).subscribe(
            () => { this.snackBar.open(successMessage, null, snackbarConfig); },
            () => { this.snackBar.open(errorMessage, null, snackbarConfig); }
        );
    }
}
