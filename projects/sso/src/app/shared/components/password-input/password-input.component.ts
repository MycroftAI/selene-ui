import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sso-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
    @Input() formGroup: FormGroup;
    @Input() readOnly = false;
    @Input() required = false;

  constructor() { }
}
