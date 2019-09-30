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
import { MatDialog } from '@angular/material';

import { DeleteConfirmComponent } from '../../modals/delete-confirm/delete-confirm.component';

@Component({
    selector: 'account-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    public deleteWarning: string[];

    constructor(public confirmDialog: MatDialog) { }

    ngOnInit() {
        this.deleteWarning = [
            'Pressing the button below will delete your account and all data related to it from Mycroft servers.',
            'It cannot be undone.'
        ];
    }

    confirmDelete(): void {
        this.confirmDialog.open(DeleteConfirmComponent, {minWidth: '320px', maxWidth: '400px'});
    }

}
