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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

const userUrl = '/api/user';

export interface User {
    name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
    public isLoggedIn: boolean;

    constructor(private http: HttpClient) {
    }

    /**
     * API call to retrieve user info to display.
     */
    getUser(): Observable<any> {
        return this.http.get<any>(userUrl);
    }

    setLoginStatus(): void {
        const cookies = document.cookie;
        const seleneTokenExists = cookies.includes('seleneToken');
        const seleneTokenEmpty = cookies.includes('seleneToken=""');
        this.isLoggedIn = seleneTokenExists && !seleneTokenEmpty;
    }
}
