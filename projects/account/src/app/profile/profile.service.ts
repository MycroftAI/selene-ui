import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';


// URLs for the http requests
const accountUrl = '/api/account';
const agreementUrl = '/api/agreement/';
const membershipTypesUrl = '/api/memberships';

const fiveSeconds = 5000;


// Define the various data structures that will be used in this module.
export interface Agreement {
    type: string;
    version: string;
    content: string;
}

export interface AccountAgreement {
    type: string;
    acceptDate: string;
}

export interface AccountMembership {
    type: string;
    duration?: string;
    paymentAccountId?: string;
}

export interface Account {
    id: string;
    emailAddress: string;
    username: string;
    membership: AccountMembership;
    agreements: AccountAgreement[];
}

export interface MembershipType {
    type: string;
    rate: string;
    ratePeriod: string;
    stripePlan: string;
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

@Injectable()
export class ProfileService {
    public selectedMembershipType = new Subject<string>();

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    }

    handle400Error(error: HttpErrorResponse) {
        if (error.status === 400) {
            this.snackBar.open(
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

        return throwError(
        'Something bad happened; please try again later.');
    }

    addAccount(newAcctForm: FormGroup) {
        return this.http.post<any>(accountUrl, newAcctForm.value).pipe(
            catchError(this.handle400Error)
        );
    }

    /**
     * API call to retrieve account info to display.
     */
    getAccount(): Observable<Account> {
        return this.http.get<Account>(accountUrl).pipe(
            catchError(this.handleError)
        );
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

    getMembershipTypes(): Observable<MembershipType[]> {
        return this.http.get<MembershipType[]>(membershipTypesUrl);
    }

    updateAccount(accountChanges: any) {
        return this.http.patch(accountUrl, {accountChanges}).pipe(
            catchError(this.handleError)
        );
    }

    setSelectedMembershipType(accountMembership: AccountMembership, membershipTypes: MembershipType[]) {
        let selectedMembership: MembershipType;
        if (accountMembership) {
            selectedMembership = membershipTypes.find(
            (membershipType) => membershipType.type === accountMembership.type
            );
            this.selectedMembershipType.next(selectedMembership.type);
        } else {
            this.selectedMembershipType.next('Maybe Later');
        }
    }

}
