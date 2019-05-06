import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountDefaults } from '@account/models/defaults.model';
import { DeviceService } from '@account/http/device.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

const fiveSeconds = 5000;


@Component({
    selector: 'account-defaults-card',
    templateUrl: './defaults-card.component.html',
    styleUrls: ['./defaults-card.component.scss']
})
export class DefaultsCardComponent implements OnInit {
    @Input() addingDevice = false;
    @Input() defaults: AccountDefaults;
    @Input() defaultsForm: FormGroup;
    private snackbarConfig = new MatSnackBarConfig();

    constructor(
            private deviceService: DeviceService,
            private snackbar: MatSnackBar
    ) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
    }

    onSave() {
        if (this.defaults) {
            this.deviceService.updateAccountDefaults(this.defaultsForm).subscribe(
                () => {
                    this.defaults = this.defaultsForm.value;
                    this.snackbar.open(
                        'Default values saved',
                        null,
                        this.snackbarConfig
                    );
                }
            );
        } else {
            this.deviceService.addAccountDefaults(this.defaultsForm).subscribe(
                () => {
                    this.defaults = this.defaultsForm.value;
                    this.snackbar.open(
                        'Default values saved',
                        null,
                        this.snackbarConfig
                    );
                }
            );
        }
    }
}
