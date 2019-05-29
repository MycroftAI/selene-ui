import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { LoginToken } from '../../../shared/models/login-token.model';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'sso-authentication-step',
    templateUrl: './authentication-step.component.html',
    styleUrls: ['./authentication-step.component.scss']
})
export class AuthenticationStepComponent implements OnInit {
    @Input() loginForm: FormGroup;
    public disableInternal = false;
    public federatedErrorMessage: string;
    public federatedLoginText: string;
    public internalLoginText: string;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        console.log('authentication step: ' + environment.facebookClientId);
        this.federatedLoginText = 'To use this option, you must allow the ' +
            'provider to share your email address with Mycroft.';
        this.internalLoginText = 'Login credentials stored on Mycroft ' +
            'servers are encrypted for your privacy and protection.';
    }

    onFederatedLogin(token: LoginToken) {
        this.apiService.validateEmailAddress(token).subscribe(
            (response) => {
                if (response.accountExists) {
                    this.federatedErrorMessage = 'Account already exists for this email';
                } else if (response.noFederatedEmail) {
                    this.federatedErrorMessage = 'Could not retrieve email from ' + token.platform;

                } else {
                    this.loginForm.patchValue(
                        {federatedPlatform: token.platform, federatedToken: token.token}
                    );
                    this.disableInternal = true;
                    this.federatedErrorMessage = null;
                }
            }
        );
    }
}
