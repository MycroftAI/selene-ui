import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface FederatedLoginToken {
    platform: string;
    token: string;
}

@Component({
    selector: 'account-authentication-step',
    templateUrl: './authentication-step.component.html',
    styleUrls: ['./authentication-step.component.scss']
})
export class AuthenticationStepComponent implements OnInit {
    public disableInternal = false;
    public federatedLoginText: string;
    public internalLoginText: string;
    @Input() newAcctForm: FormGroup;

    constructor() { }

    ngOnInit() {
        this.federatedLoginText = 'To use this option, you must allow the ' +
            'provider to share your email address with Mycroft.';
        this.internalLoginText = 'Login credentials stored on Mycroft ' +
            'servers are encrypted for your privacy and protection.';
    }

    onFederatedLogin(token: FederatedLoginToken) {
        this.newAcctForm.patchValue(
            {login: {federatedPlatform: token.platform, federatedToken: token.token}}
            );
        this.disableInternal = true;
    }
}
