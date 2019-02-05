import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

export interface AuthResponse {
    expiration: number;
    seleneAccess: string;
    seleneRefresh: string;
}

export interface SocialLoginData {
    uuid: string;
    accessToken: string;
    refreshToken: string;
    expiration: string;
}

const internalAuthUrl = '/api/internal-login';
const federatedAuthUrl = '/api/validate-federated';
const logoutUrl = '/api/logout';


@Injectable()
export class AppService {
    private cookieDomain: string = document.domain.replace('sso.', '');

    constructor(private http: HttpClient) { }

    navigateToRedirectURI(delay: number): void {
        const redirectURI = localStorage.getItem('redirect');
        localStorage.removeItem('redirect');
        setTimeout(() => { window.location.assign(redirectURI); }, delay);
    }

    /**
     * Authenticate a user that provides their email address and password as an authentication mechanism
     *
     * For security purposes, encode the raw email address and password using the btoa (binary to ASCII)
     * function so that the raw string values are not included in the request.  Email and password are
     * considered "internal-login" because the authentication data is stored on Mycroft servers.
     *
     * @param emailAddress: email address of the user
     * @param password: password for the account
     */
    authorizeInternal (emailAddress, password): Observable<AuthResponse> {
        const rawCredentials = `${emailAddress}:${password}`;
        const codedCredentials = btoa(rawCredentials);
        const httpHeaders = new HttpHeaders(
            {'Authorization': 'Basic ' + codedCredentials}
        );
        return this.http.get<AuthResponse>(internalAuthUrl, {headers: httpHeaders});
    }

    validateFederatedLogin(socialLoginData: any) {
        return this.http.post<AuthResponse>(
            federatedAuthUrl,
            socialLoginData
        );
    }

    logout(): Observable<any> {
        return this.http.get(logoutUrl);
    }

    expireTokenCookies(): void {
        const expiration = new Date();
        document.cookie = 'seleneAccess=""' +
            '; expires=' + expiration.toUTCString() +
            '; domain=' + this.cookieDomain;
        document.cookie = 'seleneRefresh=""' +
            '; expires=' + expiration.toUTCString() +
            '; domain=' + this.cookieDomain;

    }

    gitHubLogin() {
        return this.http.get<string>('https://github.com/login/oauth/authorize' +
            '?scope=user:email&client_id=752bb0864dd667c902f4');
    }

}
