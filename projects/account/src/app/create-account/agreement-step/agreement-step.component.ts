import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'account-agreement-step',
  templateUrl: './agreement-step.component.html',
  styleUrls: ['./agreement-step.component.scss']
})
export class AgreementStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    @Input() step: string;
    public agreementAccepted = false;
    public acceptedIcon = faCheck;

    constructor() {
    }

    ngOnInit() {
    }

    acceptAgreement() {
        if (this.step === 'Terms of Use') {
            this.newAcctForm.controls.termsOfUse.setValue(true);
        } else {
            this.newAcctForm.controls.privacyPolicy.setValue(true);
        }
        this.agreementAccepted = true;
    }

    declineAgreement () {
        this.agreementAccepted = false;
    }
}
