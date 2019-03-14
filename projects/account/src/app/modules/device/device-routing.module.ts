import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceComponent} from './device.component';
import { PreferencesResolverService } from '../../core/guards/preferences-resolver.service';

const deviceRoutes: Routes = [
    {path: 'devices', component: DeviceComponent},
    {
        path: 'devices/add',
        component: DeviceAddComponent,
        resolve: {
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
