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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { ApiService } from '../../../core/http/api.service';


@Component({
  selector: 'sso-agreement-step',
  templateUrl: './agreement-step.component.html',
  styleUrls: ['./agreement-step.component.scss']
})
export class AgreementStepComponent implements OnInit {
    public acceptedIcon = faCheck;
    public agreementAccepted = false;
    public agreementContent: SafeHtml;
    @Input() newAcctForm: FormGroup;
    @Input() step: string;

    constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.apiService.getAgreement(this.step).subscribe(
            (response) => { this.agreementContent = this.sanitizer.bypassSecurityTrustHtml(response.content); }
        );
    }

    acceptAgreement() {
        if (this.step === 'Terms of Use') {
            this.newAcctForm.controls.termsOfUse.setValue(true);
        } else {
            this.newAcctForm.controls.privacyPolicy.setValue(true);
        }
        this.agreementAccepted = true;
    }

    declineAgreement () {
        if (this.step === 'Terms of Use') {
            this.newAcctForm.controls.termsOfUse.setValue(false);
        } else {
            this.newAcctForm.controls.privacyPolicy.setValue(false);
        }
        this.agreementAccepted = false;
    }
}
