import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

import { AppService } from '../../app.service';

const noDelay = 0;
const tenSeconds = 10000;

@Component({
  selector: 'sso-federated-login',
  templateUrl: './federated-login.component.html',
  styleUrls: ['./federated-login.component.scss']
})
export class FederatedLoginComponent implements OnInit {
    public facebookIcon = faFacebook;
    public githubIcon = faGithub;

    constructor(
        private authService: AuthService,
        private errorSnackBar: MatSnackBar,
        private ssoService: AppService
    ) { }

    ngOnInit() { }

    public federatedSignIn(platform: string) {
        let platformProvider;
        if ( platform === 'facebook') {
            platformProvider = FacebookLoginProvider.PROVIDER_ID;
            this.facebookGoogleLogin(platformProvider);
        } else if (platform === 'google') {
            platformProvider = GoogleLoginProvider.PROVIDER_ID;
            this.facebookGoogleLogin(platformProvider);
        } else if (platform === 'github') {
            this.ssoService.gitHubLogin().subscribe((response) => { console.log(response); });
        }

    }

    private facebookGoogleLogin(platformProvider) {
        this.authService.signIn(platformProvider).then(
            (userData) => {
                this.ssoService.validateFederatedLogin(userData).subscribe(
                    (response) => { this.ssoService.navigateToRedirectURI(noDelay); },
                    (response) => { this.onAuthFailure(response); }
                );
            }
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
