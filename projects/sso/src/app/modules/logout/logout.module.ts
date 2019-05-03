import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { ApiService } from '../../core/http/api.service';
import { LogoutComponent } from './logout.component';

@NgModule({
    declarations: [ LogoutComponent ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    providers: [ ApiService ]
})
export class LogoutModule { }
