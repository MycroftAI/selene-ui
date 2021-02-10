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

import { Component, Input, OnInit } from '@angular/core';

import { faInfoCircle, faCog, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
    public infoIcon = faInfoCircle;
    public configIcon = faCog;
    public locationIcon = faMapMarkerAlt;

    constructor() { }

    ngOnInit() {
    }

    getPlatform(device: Device) {
        const knownPlatform = this.platforms[device.platform];
        return knownPlatform ? knownPlatform.displayName : device.platform;
    }

}
