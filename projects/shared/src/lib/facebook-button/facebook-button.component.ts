import { Component, EventEmitter, Output } from '@angular/core';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthService, FacebookLoginProvider } from 'angular-6-social-login';

import { FederatedLoginToken } from '../shared/models/federated-login.model';

@Component( {
    selector: 'shared-facebook-button',
    templateUrl: './facebook-button.component.html',
    styleUrls: ['./facebook-button.component.scss']
})
export class FacebookButtonComponent {
    public facebookIcon = faFacebook;
    @Output() facebookToken = new EventEmitter<FederatedLoginToken>();

    constructor(private authService: AuthService) { }

    facebookLogin() {
        const platformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.authService.signIn(platformProvider).then(
            (userData) => {
                this.facebookToken.emit({platform: 'Facebook', token: userData.token});
            }
        );
    }

}
