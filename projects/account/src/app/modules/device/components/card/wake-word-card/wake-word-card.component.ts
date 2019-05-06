import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';

@Component({
    selector: 'account-wake-word-card',
    templateUrl: './wake-word-card.component.html',
    styleUrls: ['./wake-word-card.component.scss']
})
export class WakeWordCardComponent implements OnInit {
    @Input() wakeWordForm: FormGroup;
    public wakeWordOptionsConfig: OptionButtonsConfig;


    constructor() {
        this.wakeWordOptionsConfig = {
            options: ['Hey Mycroft', 'Christopher', 'Hey Ezra', 'Hey Jarvis'],
            buttonWidth: '130px'
        };
    }

    ngOnInit() {
  }

}
