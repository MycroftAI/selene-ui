import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { CreateAccountService } from '../create-account.service';


@Component({
  selector: 'account-agreement-step',
  templateUrl: './agreement-step.component.html',
  styleUrls: ['./agreement-step.component.scss']
})
export class AgreementStepComponent implements OnInit {
    public acceptedIcon = faCheck;
    public agreementAccepted = false;
    public agreementContent: SafeHtml;
    @Input() newAcctForm: FormGroup;
    @Input() step: string;

    constructor(private newAcctService: CreateAccountService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.newAcctService.getAgreement(this.step).subscribe(
            (response) => { this.agreementContent = this.sanitizer.bypassSecurityTrustHtml(response.content); }
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
