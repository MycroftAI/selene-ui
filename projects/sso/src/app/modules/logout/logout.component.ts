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

import { ApiService } from '../../core/http/api.service';
import { environment} from '../../../environments/environment';

const halfSecond = 500;

@Component({
    selector: 'sso-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    constructor(private appService: ApiService) { }

    ngOnInit() {
        localStorage.setItem('redirect', environment.mycroftUrls.wordPress);

        this.appService.logout().subscribe(
          () => { this.onLogoutSuccess(); },
        );
    }

    onLogoutSuccess(): void {
        this.appService.navigateToRedirectURI(halfSecond);
    }
}
