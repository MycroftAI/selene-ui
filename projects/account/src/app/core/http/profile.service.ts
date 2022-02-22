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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Account } from '@account/models/account.model';
import { environment } from '../../../environments/environment';
import { MembershipType } from '@account/models/membership.model';
import { handleError } from '@account/app/app.service';


// URLs for the http requests
const ACCOUNT_URL = '/api/account';
const MEMBERSHIP_URL = '/api/memberships';


export function storeRedirect() {
    localStorage.setItem(
        'redirect',
        decodeURIComponent(window.location.search).slice(10)
    );
}

export function navigateToLogin(delay: number): void {
    let redirectURI = localStorage.getItem('redirect');
    localStorage.removeItem('redirect');
    if (!redirectURI) {
        redirectURI = environment.mycroftUrls.account;
    }
    const singleSignOnURI = environment.mycroftUrls.singleSignOn +
        '/login?redirect=' +
        redirectURI;
    setTimeout(() => { window.location.assign(singleSignOnURI); }, delay);
}

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    /**
     * API call to retrieve account info to display.
     */
    getAccount(): Observable<Account> {
        return this.http.get<Account>(ACCOUNT_URL).pipe(
            catchError(handleError)
        );
    }

    getMembershipTypes(): Observable<MembershipType[]> {
        return this.http.get<MembershipType[]>(MEMBERSHIP_URL);
    }

    updateAccount(accountChanges: any) {
        return this.http.patch(ACCOUNT_URL, accountChanges).pipe(
            catchError(handleError)
        );
    }

    deleteAccount() {
        return this.http.delete(ACCOUNT_URL);
    }
}
