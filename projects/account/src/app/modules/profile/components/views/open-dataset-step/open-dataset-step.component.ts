import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-open-dataset-step',
    templateUrl: './open-dataset-step.component.html',
    styleUrls: ['./open-dataset-step.component.scss']
})
export class OpenDatasetStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public openDatasetDescription: string[];

    constructor() { }

    ngOnInit(): void {
        this.openDatasetDescription = [
            'Mycroft\'s voices and services can only improve with your help.  ' +
            'By joining our open dataset, you agree to allow Mycroft AI to collect data related ' +
            'to your interactions with devices running Mycroft\'s voice assistant software.  ' +
            'We pledge to use this contribution in a responsible way.',
            'Your data will also be made available to other researchers in the ' +
            'voice AI space with values that align with our own, like Mozilla Common Voice.  ' +
            'As part of their agreement with Mycroft AI to access this data, they will be ' +
            'required to honor your request to remove any trace of your contributions if you ' +
            'decide to opt out.',
            'You can opt in or out of the open dataset at any time on your account profile page.',
            'We thank you in advance for helping to improve Mycroft\'s services!'
        ];
    }

    onOptIn(): void {
        this.newAcctForm.patchValue({openDataset: true});
    }

    onOptOut(): void {
        this.newAcctForm.patchValue({openDataset: false});
    }
}
