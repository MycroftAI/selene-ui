import { Component } from '@angular/core';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';


@Component({
    selector: 'shared-facebook-button',
    templateUrl: './facebook-button.component.html',
    styleUrls: ['./facebook-button.component.scss']
})
export class FacebookButtonComponent {
    public facebookIcon = faFacebook;

    constructor() { }

}
