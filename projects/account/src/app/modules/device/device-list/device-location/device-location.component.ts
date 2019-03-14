import { Component, Input } from '@angular/core';

import { Geography } from '../../../../shared/models/geography.model';

@Component({
    selector: 'account-device-location',
    templateUrl: './device-location.component.html',
    styleUrls: ['./device-location.component.scss']
})
export class DeviceLocationComponent {
    @Input() geography: Geography;
    @Input() placement: string;

    constructor() { }
}
