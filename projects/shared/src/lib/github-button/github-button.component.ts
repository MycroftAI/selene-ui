import { Component } from '@angular/core';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'shared-github-button',
    templateUrl: './github-button.component.html',
    styleUrls: ['./github-button.component.scss']
})
export class GithubButtonComponent {
    public githubIcon = faGithub;

    constructor() { }
}
