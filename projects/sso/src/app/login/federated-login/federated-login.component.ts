import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { AppService } from '../../app.service';

const noDelay = 0;
const tenSeconds = 10000;

@Component({
  selector: 'sso-federated-login',
  templateUrl: './federated-login.component.html',
  styleUrls: ['./federated-login.component.scss']
})
export class FederatedLoginComponent implements OnInit {
    public githubIcon = faGithub;

    constructor(
        private errorSnackBar: MatSnackBar,
        private ssoService: AppService
    ) { }

    ngOnInit() { }

    private validateFederatedLogin(email: string) {
        this.ssoService.validateFederatedLogin(email).subscribe(
            (response) => { this.ssoService.navigateToRedirectURI(noDelay); },
            (response) => { this.onAuthFailure(response); }
        );
    }

    onAuthFailure(authorizeUserResponse): void {
        if (authorizeUserResponse.status === 401) {
            this.errorSnackBar.open(
                'No account found for that email address',
                'SIGN UP',
                {panelClass: 'mycroft-snackbar', duration: tenSeconds}
            );
        }
    }

    private gitHubLogin() {
        const githubLoginUrl = 'https://github.com/login/oauth/authorize' +
            '?scope=user:email&client_id=752bb0864dd667c902f4';
        window.location.assign(githubLoginUrl);
    }
}
