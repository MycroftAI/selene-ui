import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'sso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Mycroft Login';
    public environment = environment;
    public socialLoginDataFound = false;

    constructor () {
    }

    ngOnInit () {
        const uriParams = decodeURIComponent(window.location.search);

        if (!window.location.pathname && uriParams) {
            this.socialLoginDataFound = true;
            window.opener.postMessage(uriParams, window.location.origin);
            window.close();
        }
    }

}
