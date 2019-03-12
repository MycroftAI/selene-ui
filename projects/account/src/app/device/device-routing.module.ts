import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent} from './device.component';

const deviceRoutes: Routes = [
    {path: 'devices', component: DeviceComponent},
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
