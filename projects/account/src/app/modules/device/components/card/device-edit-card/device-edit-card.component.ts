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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'account-device-edit-card',
    templateUrl: './device-edit-card.component.html',
    styleUrls: ['./device-edit-card.component.scss']
})
export class DeviceEditCardComponent implements OnInit {
    @Input() deviceForm: UntypedFormGroup;
    @Input() addDevice = false;
    @Input() pantacorId: string;
    @Output() saveChanges = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    onSave() {
        this.saveChanges.emit(true);
    }

    onCancel() {
        this.saveChanges.emit(false);
    }

    getPairingCodeError(): string {
        let errorMessage = '';
        const pairingCodeControl = this.deviceForm.controls['pairingCode'];
        if (pairingCodeControl.hasError('required')) {
            errorMessage = 'This value is required';
        } else if (pairingCodeControl.hasError('minlength')) {
            errorMessage = 'Pairing code must be six characters';
        } else if (pairingCodeControl.hasError('maxlength')) {
            errorMessage = 'Pairing code must be six characters';
        } else if (pairingCodeControl.hasError('unknownPairingCode')) {
            errorMessage = 'Unknown pairing code';
        }
        return errorMessage;
    }
}
