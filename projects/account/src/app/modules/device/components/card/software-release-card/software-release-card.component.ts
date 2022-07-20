import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';

@Component({
    selector: 'account-software-release-card',
    templateUrl: './software-release-card.component.html',
    styleUrls: ['./software-release-card.component.scss']
})
export class SoftwareReleaseCardComponent implements OnInit {
    @Input() softwareReleaseForm: UntypedFormGroup;
    public releaseChannelConfig: OptionButtonsConfig;

    constructor() {
        this.releaseChannelConfig = {
            options: ['Stable', 'Latest', 'QA'],
            buttonWidth: '130px'
        };
    }

    ngOnInit(): void {
    }

}
