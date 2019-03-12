import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { storeRedirect } from '../app.service';

@Component({
    selector: 'sso-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public environment = environment;
    public createAccountUrl: string;

    constructor() {
        this.createAccountUrl = environment.mycroftUrls.account + '/new';
    }

    ngOnInit() {
        storeRedirect();
    }
}
