/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { DeviceService } from '@account/http/device.service';
import { Device } from '@account/models/device.model';
import { RemoveDeviceDialogComponent } from '../../components/modal/remove-device-dialog/remove-device-dialog.component';

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
        const removalDialogRef = this.dialog.open(RemoveDeviceDialogComponent, {data: false});
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

    getDeviceIcon(device: Device) {
        const knownPlatform = this.platforms[device.platform];
        return knownPlatform ? knownPlatform.icon : '../assets/generic-device-icon-blue.svg';
    }

    goToExternal() {
        const url = 'http://192.168.4.103:8080';
        window.open(url, '_blank');
    }
}
