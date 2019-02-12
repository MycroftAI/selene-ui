import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Agreement, CreateAccountService } from '../create-account.service';


@Component({
  selector: 'account-agreement-step',
  templateUrl: './agreement-step.component.html',
  styleUrls: ['./agreement-step.component.scss']
})
export class AgreementStepComponent implements OnInit {
    public acceptedIcon = faCheck;
    public agreementAccepted = false;
    public agreementContent: string;
    @Input() newAcctForm: FormGroup;
    @Input() step: string;

    constructor(private newAcctService: CreateAccountService) {
    }

    ngOnInit() {
        this.newAcctService.getAgreement(this.step).subscribe(
            (response) => { this.agreementContent = response.content; }
        );
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
        if (this.step === 'Terms of Use') {
            this.newAcctForm.controls.termsOfUse.setValue(false);
        } else {
            this.newAcctForm.controls.privacyPolicy.setValue(false);
        }
        this.agreementAccepted = false;
    }
}
