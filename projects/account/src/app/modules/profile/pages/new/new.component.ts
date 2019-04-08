import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { MembershipType } from '@account/models/membership.model';
import {
    navigateToLogin,
    ProfileService,
    storeRedirect
} from '@account/http/profile.service';

const noDelay = 0;

export function loginValidator(): ValidatorFn {
    return (loginGroup: FormGroup) => {
        let valid = true;
        const federatedToken = loginGroup.controls['federatedToken'];
        const userEnteredEmail  = loginGroup.controls['userEnteredEmail'];
        const password = loginGroup.controls['password'];

        if (federatedToken.value) {
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
        const paymentToken  = supportGroup.controls['paymentToken'];

        if (membershipType.value) {
            if (!paymentToken.value) {
                valid = false;
            }
        }
        return valid ? null : {membershipInvalid: true};
    };
}


@Component({
  selector: 'account-create-account',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
    public alignVertical: boolean;
    public usernameControl: AbstractControl;
    public loginControl: AbstractControl;
    private mediaWatcher: Subscription;
    public membershipTypes: MembershipType[];
    public newAcctForm: FormGroup;
    public privacyPolicyControl: AbstractControl;
    public stepDoneIcon = faCheck;
    public supportControl: AbstractControl;
    public termsOfUseControl: AbstractControl;

    constructor(
        private formBuilder: FormBuilder,
        public mediaObserver: MediaObserver,
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {membershipTypes: MembershipType[]}) => {
                this.membershipTypes = data.membershipTypes;
            }
        );
        storeRedirect();
        this.buildForm();
        this.setControlFormAliases();
    }

    private buildForm() {
        const loginGroup = this.formBuilder.group(
            {
                federatedPlatform: [null],
                federatedToken: [null],
                userEnteredEmail: [null, Validators.email],
                password: [null]
            },
            {validator: loginValidator()}
        );
        const supportGroup = this.formBuilder.group(
            {
            openDataset: [null, Validators.required],
            membership: [null],
            paymentMethod: [null],
            paymentToken: [null]

            },
            {validator: membershipValidator()}
        );

        this.newAcctForm = this.formBuilder.group({
            username: ['', Validators.required],
            privacyPolicy: [false, Validators.requiredTrue],
            termsOfUse: [false, Validators.requiredTrue],
            login: loginGroup,
            support: supportGroup
        });
    }

    private setControlFormAliases() {
        this.usernameControl = this.newAcctForm.controls['username'];
        this.loginControl = this.newAcctForm.controls['login'];
        this.privacyPolicyControl = this.newAcctForm.controls['privacyPolicy'];
        this.supportControl = this.newAcctForm.controls['support'];
        this.termsOfUseControl = this.newAcctForm.controls['termsOfUse'];

    }

    onFormSubmit() {
        this.profileService.addAccount(this.newAcctForm).subscribe(
            () => { navigateToLogin(noDelay); }
        );
    }
}
