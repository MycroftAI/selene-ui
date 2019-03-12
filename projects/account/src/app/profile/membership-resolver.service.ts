import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { MembershipType, ProfileService } from './profile.service';

@Injectable({
    providedIn: 'root',
})
export class MembershipResolverService implements Resolve<MembershipType[]> {
    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MembershipType[]> | Observable<never> {
        return this.profileService.getMembershipTypes();
    }
}
