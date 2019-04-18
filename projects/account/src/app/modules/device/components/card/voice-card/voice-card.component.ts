import { Component, Input, OnInit } from '@angular/core';
import { OptionButtonsConfig } from '@account/models/option-buttons-config.model';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'account-voice-card',
    templateUrl: './voice-card.component.html',
    styleUrls: ['./voice-card.component.scss']
})
export class VoiceCardComponent implements OnInit {
    @Input() voiceControl: AbstractControl;
    public voiceOptionsConfig: OptionButtonsConfig;

    constructor() {
        this.voiceOptionsConfig = {
            options: ['British Male', 'American Female', 'American Male', 'Google Voice'],
            buttonWidth: '140px'
        };
    }

    ngOnInit() {
    }

}
