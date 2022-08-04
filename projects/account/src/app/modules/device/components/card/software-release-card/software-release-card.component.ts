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
import { UntypedFormGroup } from '@angular/forms';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';

@Component({
    selector: 'account-software-release-card',
    templateUrl: './software-release-card.component.html',
    styleUrls: ['./software-release-card.component.scss']
})
export class SoftwareReleaseCardComponent implements OnInit {
    @Input() softwareReleaseForm: UntypedFormGroup;
    public releaseChannelConfig: OptionButtonsConfig;

    constructor() {
        this.releaseChannelConfig = {
            options: ['Stable', 'Latest', 'QA'],
            buttonWidth: '130px'
        };
    }

    ngOnInit(): void {
    }

}
