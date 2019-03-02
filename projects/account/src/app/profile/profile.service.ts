import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

const accountUrl = '/api/account';

export interface Agreement {
    type: string;
    acceptDate: string;
}

export interface Membership {
    type: string;
    duration: string;
    paymentAccountId: string;
}

export interface Account {
    id: string;
    emailAddress: string;
    username: string;
    membership: Membership;
    agreements: Agreement[];
}

@Injectable()
export class ProfileService {
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
}
