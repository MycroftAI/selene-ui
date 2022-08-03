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

import { Component, Input, OnInit } from '@angular/core';

import { faFileAlt, faHandshake, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Account } from '@account/models/account.model';

@Component({
    selector: 'account-agreements-edit',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
    @Input() account: Account;
    public agreementIcon: IconDefinition = faHandshake;
    public documentIcon = faFileAlt;

    constructor() { }

    ngOnInit() {
    }

    buildAgreementUrl(agreementType: string): string {
        let url = 'https://mycroft.ai/';
        if (agreementType === 'Privacy Policy') {
            url += 'embed-privacy-policy';
        } else {
            url += 'embed-terms-of-use';
        }

        return url;
    }
}
