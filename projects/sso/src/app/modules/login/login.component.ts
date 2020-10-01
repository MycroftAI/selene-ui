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
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/http/api.service';
import { LoginToken } from '../../shared/models/login-token.model';
import { SnackbarComponent } from 'shared';


@Component({
    selector: 'sso-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public environment = environment;

    constructor(
        private route: ActivatedRoute,
        private service: ApiService,
        private snackbar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (params) => { this.evaluateQueryParams(params); }
        );
    }

    /**
     * The GitHib login button redirects to this page while it is going through the
     * authentication process.  When it does, it sets query parameters that are used
     * to facilitate the user authentication.
     *
     * @param queryParams: set by the GitHub authentication process
     */
    evaluateQueryParams(queryParams: any) {
        if (queryParams.redirect) {
            localStorage.setItem('redirect', queryParams.redirect);
        }
        if (queryParams.code) {
            this.service.getGithubToken(queryParams.code, queryParams.state).subscribe(
                (response) => { this.loginGithubUser(response.token); }
            );
        }
    }

    loginGithubUser(oauthToken: string) {
        const loginValidation: LoginToken = {
            platform: 'GitHub',
            token: oauthToken,
        };
        this.service.validateFederatedLogin(loginValidation).subscribe(
            () => { this.service.navigateToRedirectURI(0); },
            (response) => { this.openErrorSnackbar(response.error.error);
            }
        );
    }

    openErrorSnackbar(errorMessage: string) {
        const config = new MatSnackBarConfig();
        // config.duration = 1000;
        config.data = {type: 'error', message: errorMessage};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }
}
