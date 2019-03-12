import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const accountUrl = '/api/account';
import { environment } from '../../environments/environment';
const membershipTypesUrl = '/api/memberships';

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

@Injectable()
export class ProfileService {
    public selectedMembershipType = new Subject<string>();

    constructor(private http: HttpClient) {
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
        return this.http.get<Account>(accountUrl).pipe(
            catchError(this.handleError)
        );
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
