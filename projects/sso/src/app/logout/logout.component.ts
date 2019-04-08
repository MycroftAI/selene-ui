import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { environment} from '../../environments/environment';

const halfSecond = 500;

@Component({
    selector: 'sso-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    constructor(private appService: AppService) { }

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
