import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
    public alignVertical: boolean;
    public newAcctForm: FormGroup;
    private mediaWatcher: Subscription;
    public stepDoneIcon = faCheck;
    public termsOfUse = 'Terms of Use';
    public privacyPolicy = 'Privacy Policy';
    public termsOfUseControl = new FormControl(false, Validators.requiredTrue);
    public privacyPolicyControl = new FormControl(false, Validators.requiredTrue);
    public openDatasetControl = new FormControl(null, Validators.required);
    public emailControl = new FormControl('', Validators.email);
    public passwordControl = new FormControl('', Validators.required);
    public usernameControl = new FormControl('', Validators.required);
    public subscriptionControl = new FormControl(null);

    constructor(public mediaObserver: MediaObserver) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }
    ngOnInit() {
        this.newAcctForm = new FormGroup(
            {
                termsOfUse: this.termsOfUseControl,
                privacyPolicy: this.privacyPolicyControl,
                openDataset: this.openDatasetControl,
                emailAddress: this.emailControl,
                password: this.passwordControl,
                username: this.usernameControl,
                subscription: this.subscriptionControl
            }
        );
    }

    onFormSubmit() {
        console.log(this.newAcctForm.value);
    }
}
