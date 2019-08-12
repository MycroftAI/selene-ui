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

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'sso-email-input',
    templateUrl: './email-input.component.html',
    styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent {
    @Input() formGroup: FormGroup;
    @Input() readOnly: boolean;
    @Input() required: boolean;

    constructor() { }

    getEmailError(): string {
        let errorMessage = '';
        const emailControl = this.formGroup.controls['email'];
        if (emailControl.hasError('email')) {
            errorMessage = 'Must be a valid email address';
        } else if (emailControl.hasError('required')) {
            errorMessage = 'Email is required';
        } else if (emailControl.hasError('duplicateEmail')) {
            errorMessage = 'Account already exists for this email';
        }
        return errorMessage;
    }

}
