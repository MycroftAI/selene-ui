import { Component, EventEmitter, Output } from '@angular/core';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthService, FacebookLoginProvider } from 'angular-6-social-login';

@Component({
    selector: 'shared-facebook-button',
    templateUrl: './facebook-button.component.html',
    styleUrls: ['./facebook-button.component.scss']
})
export class FacebookButtonComponent {
    public facebookIcon = faFacebook;
    @Output() facebookEmail = new EventEmitter<string>();

    constructor(private authService: AuthService) { }

    facebookLogin() {
        const platformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.authService.signIn(platformProvider).then(
            (userData) => { this.facebookEmail.emit(userData.email); }
        );
    }

}
