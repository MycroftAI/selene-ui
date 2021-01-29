import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';

@Component({
    selector: 'account-software-update-card',
    templateUrl: './software-update-card.component.html',
    styleUrls: ['./software-update-card.component.scss']
})
export class SoftwareUpdateCardComponent implements OnInit {
    @Input() softwareUpdateForm: FormGroup;
    public automaticUpdate = false;

    constructor() { }

    ngOnInit(): void {
  }

    onAutoUpdateChange(changeEvent: MatSlideToggleChange) {
        console.log(changeEvent);
    }
}
