import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'account-device-pairing',
    templateUrl: './pairing.component.html',
    styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit {
    @Input() pairingCodeControl: AbstractControl;

    constructor() { }

    ngOnInit() {
    }

}
