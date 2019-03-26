import { Component, Input, OnInit } from '@angular/core';

import { Account } from '../../../../../shared/models/account.model';

@Component({
    selector: 'account-agreements-edit',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
    @Input() account: Account;

    constructor() { }

    ngOnInit() {
    }

}
