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

import { AgreementsComponent } from './agreements/agreements.component';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
    declarations: [
        AgreementsComponent,
        DeleteComponent,
        LoginComponent,
        ProfileComponent,
        SubscriptionComponent
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
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
