import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../../core/http/api.service';
import { LoginToken } from '../../../shared/models/login-token.model';

const noDelay = 0;
const tenSeconds = 10000;

@Component({
    selector: 'sso-federated-login',
    templateUrl: './federated-login.component.html',
    styleUrls: ['./federated-login.component.scss']
})
export class FederatedLoginComponent implements OnInit {
    constructor(
        private errorSnackBar: MatSnackBar,
        private ssoService: ApiService
    ) {
    }

    ngOnInit() {
    }

    validateFederatedLogin(loginToken: LoginToken) {
        this.ssoService.validateFederatedLogin(loginToken).subscribe(
            () => { this.ssoService.navigateToRedirectURI(noDelay); },
            (response) => { this.onAuthFailure(response); }
        );
    }

    onAuthFailure(authorizeUserResponse): void {
        if (authorizeUserResponse.status === 401) {
            this.errorSnackBar.open(
                'No account found for that email address',
                'CREATE ACCOUNT',
                {panelClass: 'mycroft-snackbar', duration: tenSeconds}
            );
        }
    }

}
