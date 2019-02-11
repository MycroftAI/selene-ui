import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'account-dataset-step',
    templateUrl: './username-step.component.html',
    styleUrls: ['./username-step.component.scss']
})
export class UsernameStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public whyUsernameParagraph: string;
    public usernameFormControl: AbstractControl;

    constructor() { }

    ngOnInit() {
        this.usernameFormControl = this.newAcctForm.controls.username;
        this.whyUsernameParagraph = 'In some Mycroft web applications, like our community ' +
            'forum, you will interact with other community members.  In these cases, displaying ' +
            'your email address to other users is not ideal.  Your username will be used instead ' +
            'of your email address identify you on these sites.';
    }

}
