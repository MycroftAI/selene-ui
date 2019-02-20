import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AppService } from '../../app.service';

const noDelay = 0;
const tenSeconds = 10000;

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
        private errorSnackbar: MatSnackBar,
        private formBuilder: FormBuilder
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
            this.errorSnackbar.open(
                'Authentication error, please try again',
                null,
                {panelClass: 'mycroft-no-action-snackbar', duration: tenSeconds}
            );
        }
    }
}
