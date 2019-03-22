import { Component, Input } from '@angular/core';

import { Account } from '@account/models/account.model';

@Component({
    selector: 'account-login-edit',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() account: Account;

    constructor() { }
}
