import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'account-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public environment = environment;
    title = 'Account';

    constructor() {
    }

    ngOnInit() {
    }

    //this is a comment for CI testing: please remove
}
