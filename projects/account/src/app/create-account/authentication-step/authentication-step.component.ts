import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
            'provider to share your email address with Mycroft';
        this.internalLoginText = 'Login credentials stored on Mycroft ' +
            'servers are encrypted for your privacy and protection.';
    }

    onFacebookLogin(email: string) {
        this.newAcctForm.patchValue({login: {federatedEmail: email}});
        this.disableInternal = true;
    }
}
