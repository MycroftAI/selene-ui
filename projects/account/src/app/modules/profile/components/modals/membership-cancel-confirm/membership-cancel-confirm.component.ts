import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'account-membership-cancel-confirm',
  templateUrl: './membership-cancel-confirm.component.html',
  styleUrls: ['./membership-cancel-confirm.component.scss']
})
export class MembershipCancelConfirmComponent implements OnInit {

    constructor(
        public confirmDialogRef: MatDialogRef<MembershipCancelConfirmComponent>,
    ) {
    }

    ngOnInit() {
    }

    onCancel(): void {
        this.confirmDialogRef.close(false);
    }

    onConfirm(): void {
        this.confirmDialogRef.close(true);
    }
}
