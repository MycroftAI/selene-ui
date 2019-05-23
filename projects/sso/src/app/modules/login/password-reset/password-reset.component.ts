import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'sso-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<PasswordResetComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: FormControl
    ) { }

    ngOnInit() {
    }

    onCancelClick() {
      this.dialogRef.close();
  }

}
