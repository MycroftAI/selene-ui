import { Component, EventEmitter, Output } from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
    selector: 'shared-google-button',
    templateUrl: './google-button.component.html',
    styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent {
    public googleIcon = faGoogle;
    @Output() googleEmail = new EventEmitter<string>();

    constructor(private authService: AuthService) { }

    googleLogin() {
        const platformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.authService.signIn(platformProvider).then(
            (userData) => { this.googleEmail.emit(userData.email); }
    );
}

}
