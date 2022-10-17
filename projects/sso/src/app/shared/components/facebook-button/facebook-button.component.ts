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

import { Component, EventEmitter, Output } from '@angular/core';

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';

import { LoginToken } from '../../models/login-token.model';

@Component( {
    selector: 'sso-facebook-button',
    templateUrl: './facebook-button.component.html',
    styleUrls: ['./facebook-button.component.scss']
})
export class FacebookButtonComponent {
    public facebookIcon = faFacebookSquare;
    @Output() facebookToken = new EventEmitter<LoginToken>();

    constructor(private authService: SocialAuthService) { }

    facebookLogin() {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            (userData) => {
                this.facebookToken.emit({platform: 'Facebook', token: userData.authToken});
            }
        );
    }

}
