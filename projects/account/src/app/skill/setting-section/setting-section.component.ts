import { Component, Input, OnInit } from '@angular/core';

import { SettingSection } from '../skill.service';

@Component({
    selector: 'account-setting-section',
    templateUrl: './setting-section.component.html',
    styleUrls: ['./setting-section.component.scss']
})
export class SettingSectionComponent implements OnInit {
    @Input() sections: SettingSection[];

    constructor() { }

    ngOnInit() {
  }

}
