import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';

@Component({
    selector: 'account-software-release-card',
    templateUrl: './software-release-card.component.html',
    styleUrls: ['./software-release-card.component.scss']
})
export class SoftwareReleaseCardComponent implements OnInit {
    @Input() softwareReleaseForm: FormGroup;
    public releaseChannelConfig: OptionButtonsConfig;

    constructor() {
        this.releaseChannelConfig = {
            options: ['Stable', 'Latest'],
            buttonWidth: '130px'
        };
    }

    ngOnInit(): void {
    }

}
