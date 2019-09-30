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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule(
    {
        imports: [
            MatButtonModule,
            MatCardModule,
            MatDialogModule,
            MatDividerModule,
            MatFormFieldModule,
            MatFormFieldModule,
            MatMenuModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatSnackBarModule,
            MatToolbarModule,
            MatTooltipModule
        ],
        exports: [
            MatButtonModule,
            MatCardModule,
            MatDialogModule,
            MatDividerModule,
            MatFormFieldModule,
            MatInputModule,
            MatMenuModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatSnackBarModule,
            MatToolbarModule,
            MatTooltipModule
        ]
    }
)

export class MaterialModule { }
