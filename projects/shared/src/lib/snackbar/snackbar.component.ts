import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { faBell, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'shared-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
    public icons = {error: faExclamationTriangle, info: faBell, success: faCheckCircle};
    public type: string;
    public message: string;
    public action: string;

    constructor(
            public snackbarRef: MatSnackBarRef<SnackbarComponent>,
            @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
        this.type = data.type;
        this.message = data.message;
        this.action = data.action;
    }

}
