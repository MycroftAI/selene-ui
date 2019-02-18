import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import {
    CreateAccountService,
    navigateToLogin,
    storeRedirect
} from './create-account.service';

const noDelay = 0;

export function loginValidator(): ValidatorFn {
    return (loginGroup: FormGroup) => {
        let valid = true;
        const federatedEmail = loginGroup.controls['federatedEmail'];
        const userEnteredEmail  = loginGroup.controls['userEnteredEmail'];
        const password = loginGroup.controls['password'];

        if (federatedEmail.value) {
            if (userEnteredEmail.value || password.value) {
                valid = false;
            }
        } else {
            if (!userEnteredEmail.valid || !password.value) {
                valid = false;
            }
        }
        return valid ? null : {loginInvalid: true};
    };
}

export function membershipValidator(): ValidatorFn {
    return (supportGroup: FormGroup) => {
        let valid = true;
        const membershipType = supportGroup.controls['membership'];
        const stripeCustomerId  = supportGroup.controls['stripeCustomerId'];

        if (membershipType.value !== 'MAYBE LATER') {
            if (!stripeCustomerId.value) {
                valid = false;
            }
        }
        return valid ? null : {membershipInvalid: true};
    };
}


@Component({
  selector: 'account-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
    public alignVertical: boolean;
    public displayNameControl: AbstractControl;
    public loginControl: AbstractControl;
    private mediaWatcher: Subscription;
    public newAcctForm: FormGroup;
    public privacyPolicyControl: AbstractControl;
    public stepDoneIcon = faCheck;
    public supportControl: AbstractControl;
    public termsOfUseControl: AbstractControl;

    constructor(
        private formBuilder: FormBuilder,
        public mediaObserver: MediaObserver,
        private newAcctService: CreateAccountService,
        private errorSnackbar: MatSnackBar
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }
    ngOnInit() {
        storeRedirect();
        this.buildForm();
        this.setControlFormAliases();
    }

    private buildForm() {
        const loginGroup = this.formBuilder.group(
            {
                federatedEmail: [null],
                userEnteredEmail: [null, Validators.email],
                password: [null]
            },
            {validator: loginValidator()}
        );
        const supportGroup = this.formBuilder.group(
            {
            openDataset: [null, Validators.required],
            membership: [null, Validators.required],
            stripeCustomerId: [null]

            },
            {validator: membershipValidator()}
        );

        this.newAcctForm = this.formBuilder.group({
            displayName: ['', Validators.required],
            privacyPolicy: [false, Validators.requiredTrue],
            termsOfUse: [false, Validators.requiredTrue],
            login: loginGroup,
            support: supportGroup
        });
        this.newAcctForm.patchValue({support: {stripeCustomerId: 'foostripe'}});
    }

    private setControlFormAliases() {
        this.displayNameControl = this.newAcctForm.controls['displayName'];
        this.loginControl = this.newAcctForm.controls['login'];
        this.privacyPolicyControl = this.newAcctForm.controls['privacyPolicy'];
        this.supportControl = this.newAcctForm.controls['support'];
        this.termsOfUseControl = this.newAcctForm.controls['termsOfUse'];

    }

    onFormSubmit() {
        this.newAcctService.addAccount(this.newAcctForm).subscribe(
            (response) => { navigateToLogin(noDelay); }
        );
    }
}
