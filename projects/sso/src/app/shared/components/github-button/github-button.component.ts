import { Component, Input } from '@angular/core';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'sso-github-button',
    templateUrl: './github-button.component.html',
    styleUrls: ['./github-button.component.scss']
})
export class GithubButtonComponent {
    @Input() newAccount = false;
    public githubIcon = faGithub;
    public stateParam: string;

    constructor() { }

    gitHubLogin() {
        this.generateStateParam();
        let githubLoginUrl = 'https://github.com/login/oauth/authorize' +
            '?scope=user:email&client_id=' + environment.githubClientId + '&state=' + this.stateParam;
        if (this.newAccount) {
            githubLoginUrl += '&redirect_uri=' + environment.mycroftUrls.singleSignOn + '/new-account';
        }
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
