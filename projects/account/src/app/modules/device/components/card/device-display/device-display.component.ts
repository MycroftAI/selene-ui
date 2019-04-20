import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@account/models/device.model';

@Component({
    selector: 'account-device-info',
    templateUrl: './device-display.component.html',
    styleUrls: ['./device-display.component.scss']
})
export class DeviceDisplayComponent implements OnInit {
    @Input() device: Device;
    public platforms = {
        'mycroft_mark_1': {icon: '../assets/mark-1-icon.svg', displayName: 'Mark I'},
        'mycroft_mark_2': {icon: '../assets/mark-2-icon.svg', displayName: 'Mark II'},
        'picroft': {icon: '../assets/picroft-icon.svg', displayName: 'Picroft'},
        'kde': {icon: '../assets/kde-icon.svg', displayName: 'KDE'}
    };

    constructor() { }

    ngOnInit() {
    }

    getPlatform(device: Device) {
        const knownPlatform = this.platforms[device.platform];
        return knownPlatform ? knownPlatform.displayName : device.platform;
    }

}
