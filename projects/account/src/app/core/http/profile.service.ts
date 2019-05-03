import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Account } from '@account/models/account.model';
import { AccountMembership } from '@account/models/account-membership.model';
import { environment } from '../../../environments/environment';
import { MembershipType } from '@account/models/membership.model';


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
    public selectedMembershipType = new Subject<string>();

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
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

    /**
     * API call to retrieve account info to display.
     */
    getAccount(): Observable<Account> {
        return this.http.get<Account>(ACCOUNT_URL).pipe(
            catchError(this.handleError)
        );
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
