import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-authentication-step',
    templateUrl: './authentication-step.component.html',
    styleUrls: ['./authentication-step.component.scss']
})
export class AuthenticationStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public federatedLoginBullets: string[];
    public internalLoginBullets: string[];

    constructor() { }

    ngOnInit() {
        this.federatedLoginBullets = [
            'This option can only selected if you use an email address login for the selected platforms.',
            'Once authenticated, Mycroft will obtain your email address from the chosen platform ' +
            'and store it to identify you when you login.'
        ];
        this.internalLoginBullets = [
            'Your credentials will be stored on Mycroft servers.',
            'All personal information stored on Mycroft servers is encrypted for your privacy ' +
            'and protection.'
        ];
    }

    onFacebookLogin(email: string) {
        this.newAcctForm.patchValue({login: {emailAddress: email, federatedPlatform: 'facebook'}});
        console.log(this.newAcctForm.value);
    }

}
