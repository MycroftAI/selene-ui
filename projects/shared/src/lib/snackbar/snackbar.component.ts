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

import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { faBell, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'shared-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
    public icons = {error: faExclamationTriangle, info: faBell, success: faCheckCircle};
    public type: string;
    public message: string;
    public action: string;

    constructor(
            public snackbarRef: MatSnackBarRef<SnackbarComponent>,
            @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
        this.type = data.type;
        this.message = data.message;
        this.action = data.action;
    }

}
