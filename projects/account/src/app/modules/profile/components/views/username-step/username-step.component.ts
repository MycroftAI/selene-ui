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
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'account-username-step',
    templateUrl: './username-step.component.html',
    styleUrls: ['./username-step.component.scss']
})
export class UsernameStepComponent implements OnInit {
    @Input() newAcctForm: UntypedFormGroup;
    public whyUsernameParagraph: string;
    public usernameControl: AbstractControl;

    constructor() { }

    ngOnInit() {
        this.usernameControl = this.newAcctForm.controls.username;
        this.whyUsernameParagraph = 'In some Mycroft web applications, like our community ' +
            'forum, you will interact with other community members.  In these cases, displaying ' +
            'your email address to other users is not ideal.  Your display name will be used instead ' +
            'of your email address to identify you on these sites.';
    }

}
