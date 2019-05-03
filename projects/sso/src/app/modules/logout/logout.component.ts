import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../core/http/api.service';
import { environment} from '../../../environments/environment';

const halfSecond = 500;

@Component({
    selector: 'sso-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    constructor(private appService: ApiService) { }

    ngOnInit() {
        localStorage.setItem('redirect', environment.mycroftUrls.wordPress);

        this.appService.logout().subscribe(
          () => { this.onLogoutSuccess(); },
        );
    }

    onLogoutSuccess(): void {
        this.appService.navigateToRedirectURI(halfSecond);
    }
}
