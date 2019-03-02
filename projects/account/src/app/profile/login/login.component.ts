import { Component, Input } from '@angular/core';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { Account } from '../profile.service';

@Component({
    selector: 'account-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() account: Account;
    public editIcon = faEdit;

    constructor() { }
}
