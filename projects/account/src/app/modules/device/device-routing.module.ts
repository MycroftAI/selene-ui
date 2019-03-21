import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceComponent} from './device.component';
import { PreferencesResolverService } from '../../core/guards/preferences-resolver.service';
import { DeviceResolverService } from '../../core/guards/device-resolver.service';
import { DefaultsResolverService } from '../../core/guards/defaults-resolver.service';

const deviceRoutes: Routes = [
    {
        path: 'devices',
        component: DeviceComponent,
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
