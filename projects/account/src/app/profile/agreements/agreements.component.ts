import { Component, Input, OnInit } from '@angular/core';

import { Account } from '../profile.service';

@Component({
    selector: 'account-agreements',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
    @Input() account: Account;
    // public termsOfUseAccepted: string;

    constructor() { }

    ngOnInit() {
    }

}
