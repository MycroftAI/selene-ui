import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'sso-email-input',
    templateUrl: './email-input.component.html',
    styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent {
    @Input() formGroup: FormGroup;
    @Input() readOnly: boolean;
    @Input() required: boolean;

    constructor() { }

    getEmailError(): string {
        let errorMessage = '';
        const emailControl = this.formGroup.controls['email'];
        if (emailControl.hasError('email')) {
            errorMessage = 'Must be a valid email address';
        } else if (emailControl.hasError('required')) {
            errorMessage = 'Email is required';
        } else if (emailControl.hasError('duplicateEmail')) {
            errorMessage = 'Account already exists for this email';
        }
        return errorMessage;
    }

}
