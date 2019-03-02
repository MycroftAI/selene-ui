import { Component} from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'shared-google-button',
    templateUrl: './google-button.component.html',
    styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent {
    public googleIcon = faGoogle;

    constructor() { }
}
