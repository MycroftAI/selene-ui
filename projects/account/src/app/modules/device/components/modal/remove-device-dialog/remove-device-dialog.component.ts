import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'account-device-remove',
  templateUrl: './remove-device-dialog.component.html',
  styleUrls: ['./remove-device-dialog.component.scss']
})
export class RemoveDeviceDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<RemoveDeviceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: boolean) {
    }

    ngOnInit() {
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
