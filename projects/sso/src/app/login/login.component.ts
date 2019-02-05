import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'sso-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        localStorage.setItem(
            'redirect',
            decodeURIComponent(window.location.search).slice(10)
        );
    }

}
