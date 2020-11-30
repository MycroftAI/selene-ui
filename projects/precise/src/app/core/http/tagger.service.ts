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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { TagEvent } from '../../shared/models/tag-event.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

export interface FileTag {
    audioFileId: string;
    sessionId: string;
    tagId: string;
    tagValueId: string;
}

const tagEventUrl = '/api/tag';

@Injectable()
export class TaggerService {

    constructor(private http: HttpClient) {
    }

    handleError(error: HttpErrorResponse) {
        if (error.status === 401) {
            // API endpoint required authentication but the authentication tokens
            // were either not present or expired
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

    /**
     * API call to retrieve a tag event
     */
    getTagEvent(wakeWord: string, sessionId: string): Observable<TagEvent> {
        const requestParams = {wakeWord: wakeWord};
        if (sessionId) {
            requestParams['sessionId'] = sessionId;
        }
        return this.http.get<TagEvent>(tagEventUrl, {params: requestParams}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * API call to save the tag event result
     */
    addTagEvent(fileTag: FileTag) {
        return this.http.post<any>(tagEventUrl, fileTag);
    }
}
