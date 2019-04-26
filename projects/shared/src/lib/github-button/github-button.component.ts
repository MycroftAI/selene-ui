import { Component } from '@angular/core';

import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
    selector: 'shared-github-button',
    templateUrl: './github-button.component.html',
    styleUrls: ['./github-button.component.scss']
})
export class GithubButtonComponent {
    public githubIcon = faGithub;
    public stateParam: string;

    constructor() { }

    gitHubLogin() {
        this.generateStateParam();
        const githubLoginUrl = 'https://github.com/login/oauth/authorize' +
            '?scope=user:email&client_id=752bb0864dd667c902f4&state=' + this.stateParam;
        localStorage.setItem('githubState', this.stateParam);
        window.location.assign(githubLoginUrl);
    }

    generateStateParam() {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const lengthOfCode = 40;
        this.stateParam = '';
        for (let i = 0; i < lengthOfCode; i++) {
            this.stateParam += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }

}
