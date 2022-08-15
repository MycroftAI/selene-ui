import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProfileService } from '@account/http/profile.service';


export function uniqueEmailValidator(profileService: ProfileService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const token: string = control.value ? btoa(control.value) : '';
        return profileService.validateEmailAddress(token).pipe(
            map((response) => response.accountExists ? { duplicateEmail: true } : null),
            catchError(() =>  null),
        );
    };
}


@Component({
  selector: 'account-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
    public emailControl: UntypedFormControl;

    constructor(
        private profileService: ProfileService,
        private dialogRef: MatDialogRef<ChangeEmailComponent>,
    ) {
        this.emailControl = new UntypedFormControl(
            null,
            {
                validators: [Validators.email, Validators.required],
                asyncValidators: [uniqueEmailValidator(this.profileService)],
            }
        );
    }

    ngOnInit(): void {
    }

    getEmailError(): string {
        let errorMessage = '';
        if (this.emailControl.hasError('email')) {
            errorMessage = 'Must be a valid email address';
        } else if (this.emailControl.hasError('required')) {
            errorMessage = 'Email is required';
        } else if (this.emailControl.hasError('duplicateEmail')) {
            errorMessage = 'Account already exists for this email';
        }
        return errorMessage;
    }

    changeEmail() {
        this.dialogRef.close(this.emailControl.value);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
