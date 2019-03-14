import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { Device } from '../../shared/models/device.model';
import { DeviceService } from '../http/device.service';

@Injectable({
    providedIn: 'root',
})
export class DeviceResolverService implements Resolve<Device[]> {
    constructor(private deviceService: DeviceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Device[]> | Observable<never> {
        return this.deviceService.getDevices();
    }
}
