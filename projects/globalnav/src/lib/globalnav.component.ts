import { Component, Input, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import {
    faBars,
    faLightbulb,
    faRobot,
    faRocket,
    faRss,
    faSignInAlt,
    faSignOutAlt,
    faStore,
    faUserCircle,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

import {
    expireTokenCookies,
    NavItem,
    PrimaryNavItem,
    setLoginStatus,
    User,
    WebApps
} from './globalnav.service';

@Component({
    selector: 'globalnav-sidenav',
    templateUrl: './globalnav.component.html',
    styleUrls: ['./globalnav.component.scss']
})

export class GlobalnavComponent implements OnInit {
    @Input() mycroftUrls: WebApps;
    @Input() user$: Observable<User>;
    public footerItems: NavItem[];
    public isLoggedIn: boolean;
    public menuIcon = faBars;
    public mobileQuery: MediaQueryList;
    public navigationItems: PrimaryNavItem[];
    public userName: string;

    constructor(private media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    }

    ngOnInit() {
        this.isLoggedIn = setLoginStatus();
        this.getUser();
        this.buildNavigationItems();
    }

    getUser() {
        if (this.isLoggedIn) {
            this.user$.subscribe(
                (user) => {
                    if (user.name) {
                        this.userName = user.name;
                    } else {
                        this.userName = 'Logged In';
                    }
                },
                (response) => {
                    if (response.status === 401) {
                        expireTokenCookies();
                        this.isLoggedIn = setLoginStatus();
                    }
                }
            );
        }
    }


    buildNavigationItems(): void {
        this.navigationItems = [
            this.defineAboutNav(),
            this.defineGetStartedNav(),
            this.defineBlogNav(),
            this.defineForumNav(),
            this.defineContributeNav(),
            this.defineMarketNav(),
        ];

        this.footerItems = [
            {text: 'Contact Us', url: this.mycroftUrls.wordpress + '/contact'},
            {text: 'Media Kit', url: this.mycroftUrls.wordpress + '/mediaObserver'},
            {text: 'Privacy Policy', url: this.mycroftUrls.account + '/#/privacy-policy'},
            {text: 'Terms of Use', url: this.mycroftUrls.account + '/#/terms-of-use'}
        ];
    }

    private defineAboutNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Team', url: this.mycroftUrls.wordpress + '/team'},
                {text: 'Careers', url: this.mycroftUrls.wordpress + '/careers'}
            ],
            icon: faRobot,
            text: 'About Mycroft'
        };
    }

    private defineBlogNav(): PrimaryNavItem {
        return {
            icon: faRss,
            text: 'Blog',
            url: this.mycroftUrls.wordpress + '/blog'
        };
    }

    private defineForumNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Chat', url: this.mycroftUrls.chat},
                {text: 'Forum', url: this.mycroftUrls.forum}
            ],
            icon: faUsers,
            text: 'Community'
        };
    }

    private defineContributeNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Source Code', url: 'https://github.com/MycroftAI'},
                {text: 'Translate', url: this.mycroftUrls.translate},
                {text: 'Wake Word', url: this.mycroftUrls.account + '/#/precise'},
                {text: 'Speech to Text', url: this.mycroftUrls.account + '/#/deepspeech'},
                {text: 'Text to Speech', url: this.mycroftUrls.mimic}
            ],
            icon: faLightbulb,
            text: 'Contribute'
        };
    }

    private defineGetStartedNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Get Mycroft', url: this.mycroftUrls.wordpress + '/download'},
                {text: 'Documentation', url: this.mycroftUrls.wordpress + '/documentation'}
            ],
            icon: faRocket,
            text: 'Get Started'
        };
    }

    private defineMarketNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Skills', url: this.mycroftUrls.marketplace + '/skills'},
                {text: 'Hardware', url: this.mycroftUrls.wordpress + '/shop'}
            ],
            icon: faStore,
            text: 'Marketplace'
        };
    }
}
