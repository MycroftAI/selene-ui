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
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../../core/http/api.service';
import { LoginToken } from '../../../shared/models/login-token.model';

const noDelay = 0;
const tenSeconds = 10000;

@Component({
    selector: 'sso-federated-login',
    templateUrl: './federated-login.component.html',
    styleUrls: ['./federated-login.component.scss']
})
export class FederatedLoginComponent implements OnInit {
    constructor(
        private errorSnackBar: MatSnackBar,
        private ssoService: ApiService
    ) {
    }

    ngOnInit() {
    }

    validateFederatedLogin(loginToken: LoginToken) {
        this.ssoService.validateFederatedLogin(loginToken).subscribe(
            () => { this.ssoService.navigateToRedirectURI(noDelay); },
            (response) => { this.onAuthFailure(response); }
        );
    }

    onAuthFailure(authorizeUserResponse): void {
        if (authorizeUserResponse.status === 401) {
            this.errorSnackBar.open(
                'No account found for that email address',
                'CREATE ACCOUNT',
                {panelClass: 'mycroft-snackbar', duration: tenSeconds}
            );
        }
    }

}
