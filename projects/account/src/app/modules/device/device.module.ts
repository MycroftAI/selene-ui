import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AttributeComponent } from './attribute/attribute.component';
import { DeviceComponent } from './device.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceService } from '../../core/http/device.service';
import { GeographyComponent } from './attribute/geography/geography.component';
import { GroupComponent } from './attribute/group/group.component';
import { PlacementComponent } from './attribute/placement/placement.component';
import { RemoveComponent } from './remove/remove.component';
import { VoiceComponent } from './attribute/voice/voice.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { WakeWordComponent } from './attribute/wake-word/wake-word.component';
import { AddComponent } from './add/add.component';
import { PairingComponent } from './add/pairing/pairing.component';

@NgModule({
    declarations: [
        AttributeComponent,
        DeviceComponent,
        DeviceListComponent,
        GeographyComponent,
        GroupComponent,
        PlacementComponent,
        RemoveComponent,
        VoiceComponent,
        PreferencesComponent,
        WakeWordComponent,
        AddComponent,
        PairingComponent,
    ],
    entryComponents: [
        AddComponent,
        RemoveComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        DeviceRoutingModule
    ],
    providers: [
        DeviceService
    ]
})
export class DeviceModule { }
