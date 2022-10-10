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

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AccountDefaults } from '@account/models/defaults.model';

@Component({
    selector: 'account-defaults',
    templateUrl: './defaults.component.html',
    styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent implements OnInit {
    public defaults: AccountDefaults;
    public defaultsForm: UntypedFormGroup;

    constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {defaults: AccountDefaults}) => { this.defaults = data.defaults; }
        );
        this.defaultsForm = this.formBuilder.group(
            {
                city: [this.defaults.city.name],
                country: [this.defaults.country.name],
                region: [this.defaults.region.name],
                timezone: [this.defaults.timezone.name],
                wakeWord: [this.defaults.wakeWord.name],
                voice: [this.defaults.voice.displayName]
            }
        );

    }

}
