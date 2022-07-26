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

import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { LoginToken } from '../../../shared/models/login-token.model';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'sso-authentication-step',
    templateUrl: './authentication-step.component.html',
    styleUrls: ['./authentication-step.component.scss']
})
export class AuthenticationStepComponent implements OnInit {
    @Input() loginForm: UntypedFormGroup;
    public disableInternal = false;
    public federatedErrorMessage: string;
    public federatedLoginText: string;
    public internalLoginText: string;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
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
