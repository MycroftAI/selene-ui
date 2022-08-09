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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxStripeModule } from 'ngx-stripe';

import { AgreementsComponent } from './components/cards/agreements/agreements.component';
import { ChangePasswordComponent } from './components/views/change-password/change-password.component';
import { DeleteComponent } from './components/cards/delete/delete.component';
import { EditComponent } from './pages/edit/edit.component';
import { environment} from '../../../environments/environment';
import { LoginComponent } from './components/cards/login/login.component';
import { MembershipComponent } from './components/cards/membership/membership.component';
import { MembershipOptionsComponent } from './components/controls/membership-options/membership-options.component';
import { NewComponent } from './pages/new/new.component';
import { PaymentComponent } from './components/views/payment/payment.component';
import { ProfileService } from '@account/http/profile.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'shared';
import { UsernameStepComponent } from './components/views/username-step/username-step.component';
import { VerifyCardDialogComponent } from './components/views/payment/verify-card-dialog.component';
import { DeleteConfirmComponent } from './components/modals/delete-confirm/delete-confirm.component';
import { MembershipStepComponent } from './components/views/membership-step/membership-step.component';

@NgModule({
    declarations: [
        // Profile view and edit
        AgreementsComponent,
        ChangePasswordComponent,
        DeleteComponent,
        EditComponent,
        LoginComponent,
        MembershipComponent,
        // Profile add (i.e. new account)
        MembershipStepComponent,
        NewComponent,
        UsernameStepComponent,
        // Stuff used in both edit and add components
        MembershipOptionsComponent,
        PaymentComponent,
        VerifyCardDialogComponent,
        DeleteConfirmComponent
    ],
    imports: [
        CommonModule,
        // "Make the UI pretty" libraries.
        FlexLayoutModule,
        FontAwesomeModule,
        // Angular Forms
        FormsModule,
        ReactiveFormsModule,
        // Material UI components
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatStepperModule,
        MatToolbarModule,
        // This guy will allow us to suck money from members
        NgxStripeModule.forRoot(environment.stripeApiKey),
        // The federated login buttons reside in a shared library
        SharedModule,
        // ...and finally, the router
        ProfileRoutingModule
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
