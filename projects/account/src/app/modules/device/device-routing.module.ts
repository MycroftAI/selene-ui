import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultsResolverService } from '../../core/guards/defaults-resolver.service';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceResolverService } from '../../core/guards/device-resolver.service';
import { PreferencesResolverService } from '../../core/guards/preferences-resolver.service';

const deviceRoutes: Routes = [
    {
        path: 'devices',
        component: DevicesComponent,
        resolve: {
            defaults: DefaultsResolverService,
            devices: DeviceResolverService,
            preferences: PreferencesResolverService
        }
    },
    {
        path: 'devices/add',
        component: DeviceAddComponent,
        resolve: {
            defaults: DefaultsResolverService,
            preferences: PreferencesResolverService
        }
    },
    {
        path: 'devices/:device_id',
        component: DeviceEditComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(deviceRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DeviceRoutingModule { }
