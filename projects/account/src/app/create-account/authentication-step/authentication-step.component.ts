import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-authentication-step',
    templateUrl: './authentication-step.component.html',
    styleUrls: ['./authentication-step.component.scss']
})
export class AuthenticationStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public federatedLoginText: string;
    public internalLoginText: string;

    constructor() { }

    ngOnInit() {
        this.federatedLoginText = 'To use this option, you must allow the ' +
            'provider to share your email address with Mycroft';
        this.internalLoginText = 'Login credentials stored on Mycroft ' +
            'servers are encrypted for your privacy and protection.';
    }

    onFacebookLogin(email: string) {
        this.newAcctForm.patchValue({login: {emailAddress: email, federatedPlatform: 'facebook'}});
        console.log(this.newAcctForm.value);
    }

}
