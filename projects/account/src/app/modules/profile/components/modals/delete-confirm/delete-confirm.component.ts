import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { environment } from '@account/environments/environment';
import { ProfileService } from '@account/http/profile.service';

@Component({
    selector: 'account-delete-confirm',
    templateUrl: './delete-confirm.component.html',
    styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

    constructor(
        public confirmDialogRef: MatDialogRef<DeleteConfirmComponent>,
        private profileService: ProfileService
    ) {
    }

    ngOnInit() {
    }

    onCancel(): void {
        this.confirmDialogRef.close();
    }

    onConfirm(): void {
        this.profileService.deleteAccount().subscribe(
            () => {
                this.confirmDialogRef.close();
                window.location.href = environment.mycroftUrls.singleSignOn + '/login?redirect=' + environment.mycroftUrls.account;
            }
        );
    }
}
