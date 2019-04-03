import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'account-display-field',
    templateUrl: './display-field.component.html',
    styleUrls: ['./display-field.component.scss']
})
export class DisplayFieldComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;

    constructor() {
    }

    ngOnInit() {
    }

}
