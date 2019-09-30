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

import {
    faComment,
    faPlusCircle,
    faSignInAlt,
    faSignOutAlt,
    faMicrochip,
    faUserCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'globalnav-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
    public accountIcon = faUserCircle;
    public addDeviceIcon = faPlusCircle;
    public devicesIcon = faMicrochip;
    @Input() isAuthenticated: boolean;
    public logInIcon = faSignInAlt;
    public logOutIcon = faSignOutAlt;
    @Input() mycroftUrls;
    public skillsIcon = faComment;

    constructor() { }

    ngOnInit() {
    }

    navigateToDevices() {
        window.location.href =  this.mycroftUrls.account + '/devices';
    }

    navigateToLogin() {
        window.location.href = this.mycroftUrls.singleSignOn + '/login?redirect=' + window.location.href;
    }

    navigateToCreateAccount() {
        window.location.href =  this.mycroftUrls.singleSignOn + '/new-account';
    }

    navigateToLogOut() {
        window.location.href = this.mycroftUrls.singleSignOn + '/logout?redirect=' + window.location.href;
    }

    navigateToProfile() {
        window.location.href =  this.mycroftUrls.account + '/profile';
    }

    navigateToSkills() {
        window.location.href =  this.mycroftUrls.account + '/skills';
    }

    navigateToAddDevice() {
        window.location.href =  this.mycroftUrls.account + '/devices/add';
    }
}
