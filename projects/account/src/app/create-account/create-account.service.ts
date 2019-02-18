import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const accountUrl = '/api/account';
const agreementUrl = '/api/agreement/';
const fiveSeconds = 5000;

export interface Agreement {
    type: string;
    version: string;
    content: string;
}

export function storeRedirect() {
    localStorage.setItem(
        'redirect',
        decodeURIComponent(window.location.search).slice(10)
    );
}

export function navigateToLogin(delay: number): void {
    const redirectURI = localStorage.getItem('redirect');
    const singleSignOnURI = environment.mycroftUrls.singleSignOn +
        '/login?redirect=' +
        redirectURI;
    localStorage.removeItem('redirect');
    setTimeout(() => { window.location.assign(singleSignOnURI); }, delay);
}

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

    constructor(private http: HttpClient, private errorSnackbar: MatSnackBar) {
    }

    handleError(error: HttpErrorResponse) {
        if (error.status === 400) {
            this.errorSnackbar.open(
                'Account creation failed.',
                null,
                {panelClass: 'mycroft-snackbar', duration: fiveSeconds}
            );
        }
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
        'Something bad happened; please try again later.');
    }

    getAgreement(agreementType: string) {
        let url_suffix: string;
        if (agreementType === 'Terms of Use') {
            url_suffix = 'terms-of-use';
        } else {
            url_suffix = 'privacy-policy';
        }
        return this.http.get<Agreement>(agreementUrl + url_suffix);
    }

    addAccount(newAcctForm: FormGroup) {
        return this.http.post<any>(accountUrl, newAcctForm.value).pipe(
            catchError(this.handleError)
        );
    }
}
