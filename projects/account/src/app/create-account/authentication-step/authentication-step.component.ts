import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'account-authentication-step',
    templateUrl: './authentication-step.component.html',
    styleUrls: ['./authentication-step.component.scss']
})
export class AuthenticationStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public emailFormControl: AbstractControl;
    public passwordFormControl: AbstractControl;
    public federatedLoginBullets: string[];
    public internalLoginBullets: string[];

    constructor() { }

    ngOnInit() {
        this.emailFormControl = this.newAcctForm.controls.emailAddress;
        this.passwordFormControl = this.newAcctForm.controls.password;
        this.federatedLoginBullets = [
            'This option can only selected if you use an email address log into these platforms.',
            'Once authenticated, Mycroft will obtain your email address from the chosen platform. ' +
            'and store it to identify you when you login.'
        ];
        this.internalLoginBullets = [
            'Your credentials will be stored on Mycroft servers.',
            'All personal information stored on Mycroft servers is encrypted for your privacy ' +
            'and protection.'
        ];
    }

}
