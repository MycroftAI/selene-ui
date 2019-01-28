import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AttrEditComponent } from './attribute/attr-edit.component';
import { AttrViewComponent } from './attribute/attr-view.component';
import { DeviceComponent } from './device.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceService } from './device.service';
import { GeographyEditComponent } from './attribute/geography/geography-edit.component';
import { GeographyViewComponent } from './attribute/geography/geography-view.component';
import { GroupEditComponent } from './attribute/group/group-edit.component';
import { GroupViewComponent } from './attribute/group/group-view.component';
import { PlacementEditComponent } from './attribute/placement/placement-edit.component';
import { PlacementViewComponent } from './attribute/placement/placement-view.component';
import { RemoveComponent } from './remove/remove.component';
import { VoiceEditComponent } from './attribute/voice/voice-edit.component';
import { VoiceViewComponent } from './attribute/voice/voice-view.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { WakeWordEditComponent } from './attribute/wake-word/wake-word-edit.component';
import { WakeWordViewComponent } from './attribute/wake-word/wake-word-view.component';

@NgModule({
    declarations: [
        AttrEditComponent,
        AttrViewComponent,
        DeviceComponent,
        DeviceListComponent,
        GeographyEditComponent,
        GeographyViewComponent,
        GroupEditComponent,
        GroupViewComponent,
        PlacementEditComponent,
        PlacementViewComponent,
        RemoveComponent,
        VoiceEditComponent,
        VoiceViewComponent,
        PreferencesComponent,
        WakeWordEditComponent,
        WakeWordViewComponent
    ],
    entryComponents: [
        GeographyEditComponent,
        GroupEditComponent,
        PlacementEditComponent,
        RemoveComponent,
        VoiceEditComponent,
        WakeWordEditComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule
    ],
    providers: [
        DeviceService
    ]
})
export class DeviceModule { }
