import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-done-step',
    templateUrl: './done-step.component.html',
    styleUrls: ['./done-step.component.scss']
})
export class DoneStepComponent implements OnInit {
    @Input() newAcctForm: FormGroup;

    constructor() { }

    ngOnInit() {
    }

}
