import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

import { OptionButtonsConfig } from '../../models/option-buttons-config.model';

@Component({
    selector: 'account-option-buttons',
    templateUrl: './option-buttons.component.html',
    styleUrls: ['./option-buttons.component.scss']
})
export class OptionButtonsComponent {
    @Input() config: OptionButtonsConfig;
    @Input() selectedOption: string;
    @Output() selectionChange = new EventEmitter<string>();

    constructor() {
    }

    changeOption(newSelection: MatButtonToggleChange) {
        this.selectionChange.emit(newSelection.value);
    }

}
