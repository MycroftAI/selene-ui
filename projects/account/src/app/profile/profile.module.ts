import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
} from '@angular/material';

import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DeleteComponent } from './delete/delete.component';
import { AgreementsComponent } from './agreements/agreements.component';

@NgModule({
    declarations: [
        ProfileComponent,
        LoginComponent,
        SubscriptionComponent,
        DeleteComponent,
        AgreementsComponent
    ],
    entryComponents: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule
    ]
})
export class ProfileModule { }
