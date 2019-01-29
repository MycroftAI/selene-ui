import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

export interface AuthResponse {
    expiration: number;
    seleneToken: string;
    tartarusToken: string;
}

export interface SocialLoginData {
    uuid: string;
    accessToken: string;
    refreshToken: string;
    expiration: string;
}

const antisocialAuthUrl = '/api/internal';
const facebookAuthUrl = '/api/external/facebook';
const githubAuthUrl = '/api/external/github';
const googleAuthUrl = '/api/external/google';
const generateTokensUrl = 'api/external/tokens';
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
        return this.http.get<AuthResponse>(antisocialAuthUrl, {headers: httpHeaders});
    }

    authenticateWithFacebook() {
        window.location.assign(facebookAuthUrl);
    }

    authenticateWithGithub() {
        window.location.assign(githubAuthUrl);
    }

    authenticateWithGoogle() {
        window.location.assign(googleAuthUrl);
    }

    generateExternalLoginTokens(socialLoginData: any) {
        return this.http.post<AuthResponse>(
            generateTokensUrl,
            socialLoginData
        );
    }

    generateTokenCookies(authResponse: AuthResponse) {
        const expirationDate = new Date(authResponse.expiration * 1000);
        document.cookie = 'seleneToken=' + authResponse.seleneToken +
            '; expires=' + expirationDate.toUTCString() +
            '; domain=' + this.cookieDomain;
        document.cookie = 'tartarusToken=' + authResponse.tartarusToken +
            '; expires=' + expirationDate.toUTCString() +
            '; domain=' + this.cookieDomain;
    }

    logout(): Observable<any> {
        return this.http.get(logoutUrl);
    }

    expireTokenCookies(): void {
        const expiration = new Date();
        document.cookie = 'seleneToken=""' +
            '; expires=' + expiration.toUTCString() +
            '; domain=' + this.cookieDomain;
        document.cookie = 'tartarusToken=""' +
            '; expires=' + expiration.toUTCString() +
            '; domain=' + this.cookieDomain;

  }
}
