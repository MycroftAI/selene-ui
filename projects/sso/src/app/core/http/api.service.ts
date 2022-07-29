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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Agreement } from '@account/models/agreement.model';
import { catchError } from 'rxjs/operators';
import { LoginToken } from '../../shared/models/login-token.model';
import { PasswordChangeAccount } from '../../shared/models/password-change-account.model';

const ACCOUNT_URL = '/api/account';
const AGREEMENT_URL = '/api/agreement';
const INTERNAL_AUTH_URL = '/api/internal-login';
const FEDERATED_AUTH_URL = '/api/validate-federated';
const GITHUB_TOKEN_URL = '/api/github-token';
const LOGOUT_URL = '/api/logout';
const CHANGE_PASSWORD_URL = '/api/password-change';
const RESET_PASSWORD_URL = '/api/password-reset';
const VALIDATE_EMAIL_URL = '/api/validate-email';
const VALIDATE_TOKEN_URL = '/api/validate-token';


export interface GithubToken {
    token: string;
}


@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    navigateToRedirectURI(delay: number): void {
        let redirectURI = localStorage.getItem('redirect');
        localStorage.removeItem('redirect');
        if (!redirectURI) {
            redirectURI = environment.mycroftUrls.account;
        }
        setTimeout(() => { window.location.assign(redirectURI); }, delay);
    }

    /**
     * Authenticate a user that provides their email address and password as an authentication mechanism
     *
     * For security purposes, encode the raw email address and password using the btoa (binary to ASCII)
     * function so that the raw string values are not included in the request.  Email and password are
     * considered "internal-login" because the authentication data is stored on Mycroft servers.
     *
     * @param loginForm: form containing the email and password of a user not using federated login
     */
    authorizeInternal (loginForm: UntypedFormGroup): Observable<any> {
        const loginFormValues = loginForm.value;
        const rawCredentials = `${loginFormValues.email}:||:${loginFormValues.password}`;
        const codedCredentials = btoa(rawCredentials);
        const httpHeaders = new HttpHeaders(
            {'Authorization': 'Basic ' + codedCredentials}
        );
        return this.http.get<any>(INTERNAL_AUTH_URL, {headers: httpHeaders});
    }

    validateFederatedLogin(loginToken: LoginToken): Observable<any> {
        return this.http.post<any>(FEDERATED_AUTH_URL, loginToken);
    }

    logout(): Observable<any> {
        return this.http.get(LOGOUT_URL);
    }

    resetPassword(emailAddress: AbstractControl): Observable<any> {
        return this.http.post(RESET_PASSWORD_URL, {emailAddress: emailAddress.value});
    }

    validateResetToken(token) {
        return this.http.post<PasswordChangeAccount>(VALIDATE_TOKEN_URL, {token: token});
    }

    changePassword(accountId: string, passwordControl: AbstractControl) {
        const codedPassword = btoa(passwordControl.value);
        return this.http.put(CHANGE_PASSWORD_URL, {accountId: accountId, password: codedPassword});
    }

    getGithubToken(access_code: string, state: string): Observable<GithubToken> {
        return this.http.get<GithubToken>(GITHUB_TOKEN_URL, {params: {code: access_code, state: state}});
    }

    getAgreement(agreementType: string) {
        let url_suffix: string;
        if (agreementType === 'Terms of Use') {
            url_suffix = 'terms-of-use';
        } else {
            url_suffix = 'privacy-policy';
        }
        return this.http.get<Agreement>(AGREEMENT_URL + '/' + url_suffix);
    }

    addAccount(newAcctForm: UntypedFormGroup)  {
        const formValues = newAcctForm.value;
        if (formValues.login.email) {
            formValues.login.email = btoa(formValues.login.email);
        }
        if (formValues.login.password) {
            formValues.login.password = btoa(formValues.login.password);
        }
        return this.http.post<any>(ACCOUNT_URL, newAcctForm.value).pipe(
            catchError(this.handleError)
        );
    }

    validateEmailAddress(loginToken: LoginToken): Observable<any> {
        const queryParams = {platform: loginToken.platform, token: loginToken.token};
        return this.http.get(VALIDATE_EMAIL_URL, {params: queryParams});
    }

    handleError(error: HttpErrorResponse) {
        if (error.status === 401) {
            console.log(error);
            window.location.href = environment.mycroftUrls.singleSignOn + '/login?redirect=' + window.location.href;

        } else if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }

        return throwError('Something bad happened; please try again later.');
    }
}
