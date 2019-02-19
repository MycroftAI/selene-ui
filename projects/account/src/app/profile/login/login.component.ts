import { Component, Input } from '@angular/core';

import { Account } from '../profile.service';

@Component({
    selector: 'account-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() account: Account;

    constructor() { }
}
