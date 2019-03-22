import { Component, Input, OnInit } from '@angular/core';

import {
    faComment,
    faPlusCircle,
    faSignInAlt,
    faSignOutAlt,
    faMicrochip,
    faUserCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'globalnav-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
    public accountIcon = faUserCircle;
    public addDeviceIcon = faPlusCircle;
    public devicesIcon = faMicrochip;
    @Input() isAuthenticated: boolean;
    public logInIcon = faSignInAlt;
    public logOutIcon = faSignOutAlt;
    @Input() mycroftUrls;
    public skillsIcon = faComment;

    constructor() { }

    ngOnInit() {
  }

    navigateToDevices() {
        window.location.href =  this.mycroftUrls.account + '/devices';
    }

    navigateToLogin() {
        window.location.href = this.mycroftUrls.singleSignOn + '/login?redirect=' + window.location.href;
    }

    navigateToCreateAccount() {
        window.location.href =  this.mycroftUrls.account + '/new?redirect=' + window.location.href;
    }

    navigateToLogOut() {
        window.location.href = this.mycroftUrls.singleSignOn + '/logout?redirect=' + window.location.href;
    }

    navigateToProfile() {
        window.location.href =  this.mycroftUrls.account + '/profile';
    }

    navigateToSkills() {
        window.location.href =  this.mycroftUrls.account + '/skills';
    }

    navigateToAddDevice() {
        window.location.href =  this.mycroftUrls.account + '/devices/add';
    }
}
