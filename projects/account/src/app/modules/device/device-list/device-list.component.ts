import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { DeviceService } from '../../../core/http/device.service';
import { Device} from '../../../shared/models/device.model';
import { RemoveComponent } from '../remove/remove.component';

@Component({
    selector: 'account-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
    public addIcon = faPlus;
    public devices: Device[];
    public platforms = {
        'mark-one': {icon: '../assets/mark-1-icon.svg', displayName: 'Mark I'},
        'mark-two': {icon: '../assets/mark-2-icon.svg', displayName: 'Mark II'},
        'picroft': {icon: '../assets/picroft-icon.svg', displayName: 'Picroft'},
        'kde': {icon: '../assets/kde-icon.svg', displayName: 'KDE'}
    };
    private selectedDevice: Device;

    constructor(
        public dialog: MatDialog,
        private deviceService: DeviceService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {devices: Device[]}) => { this.devices = data.devices; }
        );
    }

    onRemovalClick (device: Device) {
        const removalDialogRef = this.dialog.open(RemoveComponent, {data: false});
        this.selectedDevice = device;
        removalDialogRef.afterClosed().subscribe(
            (result) => {
                if (result) { this.deviceService.deleteDevice(device); }
            }
        );
    }

    getPlatform(device: Device) {
        const knownPlatform = this.platforms[device.platform];
        return knownPlatform ? knownPlatform.displayName : device.platform;
    }

    getDeviceIcon(device: Device) {
        const knownPlatform = this.platforms[device.platform];
        // TODO: get unknown product icon from design team.
        return knownPlatform ? knownPlatform.icon : '../assets/mark-1-icon.svg';
    }
}
