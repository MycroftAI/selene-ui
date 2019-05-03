import { Component, EventEmitter, Output } from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';

import { LoginToken } from '../../models/login-token.model';


@Component({
    selector: 'sso-google-button',
    templateUrl: './google-button.component.html',
    styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent {
    public googleIcon = faGoogle;
    @Output() googleToken = new EventEmitter<LoginToken>();

    constructor(private authService: AuthService) { }

    googleLogin() {
        const platformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.authService.signIn(platformProvider).then(
            (userData) => {
                this.googleToken.emit({platform: 'Google', token: userData.idToken});
            }
    );
}

}
