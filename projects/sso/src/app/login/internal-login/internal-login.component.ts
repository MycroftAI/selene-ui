import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthResponse, AppService } from '../../app.service';

const noDelay = 0;
const tenSeconds = 10000;

@Component({
  selector: 'sso-internal-login',
  templateUrl: './internal-login.component.html',
  styleUrls: ['./internal-login.component.scss']
})
export class InternalLoginComponent implements OnInit {
    public password: string;
    public emailAddress: string;
    public emailFormControl = new FormControl(null, [Validators.email, Validators.required]);
    public passwordFormControl = new FormControl(null, [Validators.required]);

    constructor(private authService: AppService, private errorSnackbar: MatSnackBar) { }

    ngOnInit() { }

    authorizeUser(): void {
        this.authService.authorizeInternal(this.emailAddress, this.password).subscribe(
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
