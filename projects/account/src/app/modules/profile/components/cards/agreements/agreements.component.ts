import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faFileAlt, faSignInAlt, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Account } from '@account/models/account.model';

@Component({
    selector: 'account-agreements-edit',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
    @Input() account: Account;
    @Output() openDatasetOptIn = new EventEmitter<boolean>();
    public documentIcon = faFileAlt;
    public optInOutIcon: IconDefinition;
    public openDatasetOptInDate: string;
    public openDatasetButtonText: string;

    constructor() { }

    ngOnInit() {
        const openDatasetAgreement = this.account.agreements.find(
        (agreement) => agreement.type === 'Open Dataset'
        );

        if (openDatasetAgreement) {
            this.optInOutIcon = faSignOutAlt;
            this.openDatasetButtonText = 'Opt Out';
            this.openDatasetOptInDate = 'Opted in ' + openDatasetAgreement.acceptDate;
        } else {
            this.optInOutIcon = faSignInAlt;
            this.openDatasetButtonText = 'Opt In';
            this.openDatasetOptInDate = 'Opted out';
        }
    }

    buildAgreementUrl(agreementType: string): string {
        let url = 'https://mycroft.ai/';
        if (agreementType === 'Privacy Policy') {
            url += 'embed-privacy-policy';
        } else {
            url += 'embed-terms-of-use';
        }

        return url;
    }

    onOptInOrOut() {
        this.openDatasetOptIn.emit(this.openDatasetButtonText === 'Opt In');
        if (this.openDatasetButtonText === 'Opt In') {
            this.optInOutIcon = faSignOutAlt;
            this.openDatasetButtonText = 'Opt Out';
            this.openDatasetOptInDate = 'Opted in just now';
        } else {
            this.optInOutIcon = faSignInAlt;
            this.openDatasetButtonText = 'Opt In';
            this.openDatasetOptInDate = 'Opted out';
        }
    }

}
