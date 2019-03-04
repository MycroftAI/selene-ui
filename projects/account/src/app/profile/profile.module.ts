import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
} from '@angular/material';

import { AgreementsComponent } from './agreements/agreements.component';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { MembershipComponent } from './membership/membership.component';
import { SharedModule } from 'shared';

@NgModule({
    declarations: [
        AgreementsComponent,
        DeleteComponent,
        LoginComponent,
        ProfileComponent,
        MembershipComponent
    ],
    entryComponents: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        SharedModule
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
