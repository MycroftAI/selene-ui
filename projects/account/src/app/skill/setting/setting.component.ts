import { Component, Input, OnInit } from '@angular/core';

import { Setting } from '../skill.service';

@Component({
    selector: 'account-skill-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    @Input() setting: Setting;

    constructor() { }

    ngOnInit() {
    }

}
