import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
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
    MatToolbarModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxStripeModule } from 'ngx-stripe';

import { AgreementsComponent } from './components/cards/agreements/agreements.component';
import { AgreementStepComponent } from './components/views/agreement-step/agreement-step.component';
import { AuthenticationStepComponent } from './components/views/authentication-step/authentication-step.component';
import { DeleteComponent } from './components/cards/delete/delete.component';
import { DoneStepComponent } from './components/views/done-step/done-step.component';
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
import { SupportStepComponent } from './components/views/support-step/support-step.component';
import { UsernameStepComponent } from './components/views/username-step/username-step.component';
import { VerifyCardDialogComponent } from './components/views/payment/verify-card-dialog.component';
import { DeleteConfirmComponent } from './components/modals/delete-confirm/delete-confirm.component';

@NgModule({
    declarations: [
        // Profile view and edit
        AgreementsComponent,
        DeleteComponent,
        EditComponent,
        LoginComponent,
        MembershipComponent,

        // Profile add (i.e. new account)
        AgreementStepComponent,
        AuthenticationStepComponent,
        DoneStepComponent,
        NewComponent,
        SupportStepComponent,
        UsernameStepComponent,

        // Stuff used in both edit and add components
        MembershipOptionsComponent,
        PaymentComponent,
        VerifyCardDialogComponent,
        DeleteConfirmComponent
    ],
    entryComponents: [
        DeleteConfirmComponent,
        NewComponent,
        EditComponent,
        PaymentComponent,
        VerifyCardDialogComponent
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
