import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { AccountPreferences } from '../../shared/models/preferences.model';
import { DeviceService } from '../http/device.service';

@Injectable({
    providedIn: 'root',
})
export class PreferencesResolverService implements Resolve<AccountPreferences> {
    constructor(private deviceService: DeviceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountPreferences> | Observable<never> {
        return this.deviceService.getAccountPreferences();
    }
}
