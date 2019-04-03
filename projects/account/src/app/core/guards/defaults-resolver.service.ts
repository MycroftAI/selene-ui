import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { DeviceService } from '../http/device.service';
import { AccountDefaults } from '../../shared/models/defaults.model';

@Injectable({
    providedIn: 'root',
})
export class DefaultsResolverService implements Resolve<AccountDefaults> {
    constructor(private deviceService: DeviceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountDefaults> | Observable<never> {
        return this.deviceService.getAccountDefaults();
    }
}
