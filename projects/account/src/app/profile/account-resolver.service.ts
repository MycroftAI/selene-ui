import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { Account, ProfileService } from './profile.service';

@Injectable({
    providedIn: 'root',
})
export class AccountResolverService implements Resolve<Account> {
    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> | Observable<never> {
        return this.profileService.getAccount();
    }
}
