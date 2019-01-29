import { Component, OnInit } from '@angular/core';

import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

import { AppService } from '../../app.service';

@Component({
  selector: 'sso-external-login',
  templateUrl: './external-login.component.html',
  styleUrls: ['./external-login.component.scss']
})
export class ExternalLoginComponent implements OnInit {
    public facebookIcon = faFacebook;
    public githubIcon = faGithub;

    constructor(private authService: AppService) { }

    ngOnInit() { }

    authenticateFacebook(): void {
        this.authService.authenticateWithFacebook();
    }

    authenticateGithub(): void {
        this.authService.authenticateWithGithub();
    }

    authenticateGoogle(): void {
        this.authService.authenticateWithGoogle();
    }


}
