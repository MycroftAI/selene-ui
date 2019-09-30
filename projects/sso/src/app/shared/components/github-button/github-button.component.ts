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

import { Component, Input } from '@angular/core';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'sso-github-button',
    templateUrl: './github-button.component.html',
    styleUrls: ['./github-button.component.scss']
})
export class GithubButtonComponent {
    @Input() newAccount = false;
    public githubIcon = faGithub;
    public stateParam: string;

    constructor() { }

    gitHubLogin() {
        this.generateStateParam();
        let githubLoginUrl = 'https://github.com/login/oauth/authorize' +
            '?scope=user:email&client_id=' + environment.githubClientId + '&state=' + this.stateParam +
            '&redirect_uri=' + environment.mycroftUrls.singleSignOn;
        if (this.newAccount) {
            githubLoginUrl += '/new-account';
        } else {
            githubLoginUrl += '/login';
        }
        localStorage.setItem('githubState', this.stateParam);
        window.location.assign(githubLoginUrl);
    }

    generateStateParam() {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const lengthOfCode = 40;
        this.stateParam = '';
        for (let i = 0; i < lengthOfCode; i++) {
            this.stateParam += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }
}
