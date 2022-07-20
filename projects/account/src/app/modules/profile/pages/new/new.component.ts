/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    return (loginGroup: UntypedFormGroup) => {
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
    return (supportGroup: UntypedFormGroup) => {
        let valid = true;
        const membershipType = supportGroup.controls['membershipType'];
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
    private mediaWatcher: Subscription;
    public membershipControl: AbstractControl;
    public membershipTypes: MembershipType[];
    public newAcctForm: UntypedFormGroup;
    public openDatasetControl: AbstractControl;
    public stepDoneIcon = faCheck;
    public usernameControl: AbstractControl;

    constructor(
        private formBuilder: UntypedFormBuilder,
        public mediaObserver: MediaObserver,
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private router: Router
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
        const membershipGroup = this.formBuilder.group(
            {
                newMembership: [null],
                membershipType: [null],
                paymentMethod: [null],
                paymentToken: [null]
            },
            {validator: membershipValidator()}
        );

        this.newAcctForm = this.formBuilder.group({
            username: ['', Validators.required],
            membership: membershipGroup,
            openDataset: [null, Validators.required],
        });
    }

    private setControlFormAliases() {
        this.usernameControl = this.newAcctForm.controls['username'];
        this.membershipControl = this.newAcctForm.controls['membership'];
        this.openDatasetControl = this.newAcctForm.controls['openDataset'];
    }

    onFormSubmit() {
        const newValues = this.newAcctForm.value;
        if (!newValues.membership.newMembership) {
            delete newValues.membership;
        }
        console.log(newValues);
        this.profileService.updateAccount(newValues).subscribe(
            () => { this.router.navigate(['/']); }
        );
    }
}
