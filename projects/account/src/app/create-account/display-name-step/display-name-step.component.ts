import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'account-display-name-step',
    templateUrl: './display-name-step.component.html',
    styleUrls: ['./display-name-step.component.scss']
})
export class DisplayNameStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public whyDisplayNameParagraph: string;
    public displayNameControl: AbstractControl;

    constructor() { }

    ngOnInit() {
        this.displayNameControl = this.newAcctForm.controls.displayName;
        this.whyDisplayNameParagraph = 'In some Mycroft web applications, like our community ' +
            'forum, you will interact with other community members.  In these cases, displaying ' +
            'your email address to other users is not ideal.  Your display name will be used instead ' +
            'of your email address to identify you on these sites.';
    }

}
