import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
    selector: 'account-verify-card-dialog',
    templateUrl: './verify-card-dialog.component.html',
    styleUrls: ['./verify-card-dialog.component.scss']
})
export class VerifyCardDialogComponent {
    constructor(public dialogRef: MatDialogRef<VerifyCardDialogComponent>) {}
}
