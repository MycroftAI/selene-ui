import { Component, Input, OnInit } from '@angular/core';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-preferences-card',
    templateUrl: './preferences-card.component.html',
    styleUrls: ['./preferences-card.component.scss']
})
export class PreferencesCardComponent implements OnInit {
    @Input() addingDevice = false;
    @Input() preferencesForm: FormGroup;
    public measurementOptionsConfig: OptionButtonsConfig;
    public timeFormatOptionsConfig: OptionButtonsConfig;
    public dateFormatOptionsConfig: OptionButtonsConfig;

    constructor() {
        this.dateFormatOptionsConfig = {
            label: 'Date Format',
            options: ['DD/MM/YYYY', 'MM/DD/YYYY'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
        this.measurementOptionsConfig = {
            label: 'Measurement System',
            options: ['Imperial', 'Metric'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };
        this.timeFormatOptionsConfig = {
            label: 'Time Format',
            options: ['12 Hour', '24 Hour'],
            buttonWidth: '130px',
            labelWidth: '180px'
        };

    }

    ngOnInit() {
  }

}
