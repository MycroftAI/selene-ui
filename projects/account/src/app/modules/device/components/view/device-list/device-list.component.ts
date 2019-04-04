import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { DeviceService } from '@account/http/device.service';
import { Device } from '@account/models/device.model';
import { RemoveComponent } from '../../../remove/remove.component';

const fiveSeconds = 5000;

@Component({
    selector: 'account-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
    public addIcon = faPlus;
    public devices: Device[];
    public platforms = {
        'mycroft_mark_1': {icon: '../assets/mark-1-icon.svg', displayName: 'Mark I'},
        'mycroft_mark_2': {icon: '../assets/mark-2-icon.svg', displayName: 'Mark II'},
        'picroft': {icon: '../assets/picroft-icon.svg', displayName: 'Picroft'},
        'kde': {icon: '../assets/kde-icon.svg', displayName: 'KDE'}
    };
    private selectedDevice: Device;
    private snackbarConfig = new MatSnackBarConfig();

    constructor(
        public dialog: MatDialog,
        private deviceService: DeviceService,
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar
    ) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {devices: Device[]}) => { this.devices = data.devices; }
        );
    }

    onRemove(device: Device, index: number) {
        const removalDialogRef = this.dialog.open(RemoveComponent, {data: false});
        this.selectedDevice = device;
        removalDialogRef.afterClosed().subscribe(
            (result) => {
                if (result) { this.removeDevice(device, index); }
            }
        );
    }

    removeDevice(device: Device, index: number) {
        this.deviceService.deleteDevice(device).subscribe(
            () => {
                this.devices.splice(index, 1);
                this.snackbar.open(
                    'Device removed successfully',
                    null,
                    this.snackbarConfig
                );
            },
            () => {
                this.snackbar.open(
                    'An error occurred removing the device',
                    null,
                    this.snackbarConfig
                );
            }
        );
    }

    onEdit(device: Device) {
        this.router.navigate(['/devices', device.id]);
    }

    getDeviceIcon(device: Device) {
        const knownPlatform = this.platforms[device.platform];
        // TODO: get unknown product icon from design team.
        return knownPlatform ? knownPlatform.icon : '../assets/mark-1-icon.svg';
    }
}
