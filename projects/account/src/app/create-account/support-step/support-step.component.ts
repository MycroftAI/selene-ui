import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-support-step',
    templateUrl: './support-step.component.html',
    styleUrls: ['./support-step.component.scss']
})
export class SupportStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;
    public openDatasetDescription: string[];
    public membershipDescription: string[];

    constructor() { }

    ngOnInit() {
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

        this.membershipDescription = [
            'Mycroft\'s voice assistant software is open source, which means it is free to use and ' +
            'the underlying source code is available to the public.  Our entire platform is free ' +
            'of advertisements.  The data we collect from those that opt in to our open dataset ' +
            'is not sold to anyone.',
            'While many contributions to the Mycroft platform come in the form ' +
            'of volunteer work by community  members, there is also a small team employed by Mycroft AI.  ' +
            'The team curates the software, supports the community and ensures the privacy of your data.  ' +
            'Your donation will help ensure our team can continue providing these services to our ' +
            'users and community.',
            'Members will receive benefits like access to premium voices.'
        ];
    }

    onOptIn() {
        this.newAcctForm.patchValue({support: {openDataset: true}});
    }

    onOptOut() {
        this.newAcctForm.patchValue({support: {openDataset: false}});
    }

    onMembershipSelection(selectedMembership: string) {
        this.newAcctForm.patchValue({support: {membership: selectedMembership}});
    }
}
