import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
} from '@angular/material';

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
    entryComponents: [
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
    ],
})
export class SharedModule { }
