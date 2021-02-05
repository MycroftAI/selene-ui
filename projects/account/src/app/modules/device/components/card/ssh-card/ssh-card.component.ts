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
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'account-ssh-card',
    templateUrl: './ssh-card.component.html',
    styleUrls: ['./ssh-card.component.scss']
})
export class SshCardComponent implements OnInit {
    @Input() sshForm: FormGroup;
    public sshEnabled = false;
    public sshKeyPlaceholder: string;
    public hideSshInput = true;

    constructor() {
        this.sshKeyPlaceholder = 'This device requires a public SSH key to login';
    }
    ngOnInit() {
  }

    onSshEnabledChange(changeEvent: MatSlideToggleChange) {
        this.sshEnabled = changeEvent.checked;
        this.hideSshInput = !this.sshEnabled;
    }
}