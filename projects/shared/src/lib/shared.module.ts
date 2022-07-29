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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponent } from './shared.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
    declarations: [
        SharedComponent,
        SnackbarComponent,
        MaintenancePageComponent,
        PageNotFoundComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    exports: [
        SharedComponent,
        SnackbarComponent,
        MaintenancePageComponent,
        PageNotFoundComponent,
    ]
})
export class SharedModule { }
