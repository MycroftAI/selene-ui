import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Account } from '@account/models/account.model';
import { AccountMembership } from '@account/models/account-membership.model';
import { Agreement } from '@account/models/agreement.model';
import { environment } from '../../../environments/environment';
import { MembershipType } from '@account/models/membership.model';


// URLs for the http requests
const ACCOUNT_URL = '/api/account';
const AGREEMENT_URL = '/api/agreement/';
const MEMBERSHIP_URL = '/api/memberships';

const fiveSeconds = 5000;


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

    addAccount(newAcctForm: FormGroup)  {
        return this.http.post<any>(ACCOUNT_URL, newAcctForm.value).pipe(
            catchError(this.handle400Error)
        );
    }

    /**
     * API call to retrieve account info to display.
     */
    getAccount(): Observable<Account> {
        return this.http.get<Account>(ACCOUNT_URL).pipe(
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
        return this.http.get<Agreement>(AGREEMENT_URL + url_suffix);
    }

    getMembershipTypes(): Observable<MembershipType[]> {
        return this.http.get<MembershipType[]>(MEMBERSHIP_URL);
    }

    updateAccount(accountChanges: any) {
        return this.http.patch(ACCOUNT_URL, accountChanges).pipe(
            catchError(this.handleError)
        );
    }

    deleteAccount() {
        return this.http.delete(ACCOUNT_URL);
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
