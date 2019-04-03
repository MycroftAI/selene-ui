import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DeleteConfirmComponent } from '../../modals/delete-confirm/delete-confirm.component';

@Component({
    selector: 'account-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    public deleteWarning: string[];

    constructor(public confirmDialog: MatDialog) { }

    ngOnInit() {
        this.deleteWarning = [
            'Pressing the button below will delete your account and all data related to it from Mycroft servers.',
            'It cannot be undone.'
        ];
    }

    confirmDelete(): void {
        this.confirmDialog.open(DeleteConfirmComponent, {minWidth: '320px', maxWidth: '400px'});
    }

}
