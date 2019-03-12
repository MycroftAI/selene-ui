import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
} from '@angular/material';

import { NgxStripeModule } from 'ngx-stripe';

import { AgreementsComponent } from './agreements/agreements.component';
import { DeleteComponent } from './delete/delete.component';
import { environment} from '../../environments/environment';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipOptionsComponent } from './membership-options/membership-options.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { VerifyCardDialogComponent } from './payment/verify-card-dialog.component';

@NgModule({
    declarations: [
        AgreementsComponent,
        DeleteComponent,
        LoginComponent,
        MembershipComponent,
        MembershipOptionsComponent,
        PaymentComponent,
        ProfileComponent,
        VerifyCardDialogComponent
    ],
    entryComponents: [
        LoginComponent,
        PaymentComponent,
        VerifyCardDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        NgxStripeModule.forRoot(environment.stripeApiKey),
        ProfileRoutingModule
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
