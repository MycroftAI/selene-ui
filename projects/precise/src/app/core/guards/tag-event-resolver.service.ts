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

import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { TagEvent } from '../../shared/models/tag-event.model';
import { TaggerService } from '../http/tagger.service';

@Injectable({
    providedIn: 'root',
})
export class TagEventResolverService implements Resolve<TagEvent> {
    constructor(private taggerService: TaggerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TagEvent> | Observable<never> {
        const wakeWord = route.paramMap.get('wakeWord');
        return this.taggerService.getTagEvent(wakeWord, null);
    }
}
