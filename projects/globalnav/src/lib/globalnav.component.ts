/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, Input, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import {
    faBars,
    faLightbulb,
    faRobot,
    faRocket,
    faRss,
    faStore,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

import {
    NavItem,
    PrimaryNavItem,
    setLoginStatus,
    WebApps
} from './globalnav.service';

@Component({
    selector: 'globalnav-sidenav',
    templateUrl: './globalnav.component.html',
    styleUrls: ['./globalnav.component.scss']
})

export class GlobalnavComponent implements OnInit {
    @Input() mycroftUrls: WebApps;
    public footerItems: NavItem[];
    public isLoggedIn: boolean;
    public menuIcon = faBars;
    public mobileQuery: MediaQueryList;
    public navigationItems: PrimaryNavItem[];

    constructor(private media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    }

    ngOnInit() {
        this.isLoggedIn = setLoginStatus();
        this.buildNavigationItems();
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
            {text: 'Contact Us', url: this.mycroftUrls.wordPress + '/contact', target: '_blank'},
            {text: 'Media Kit', url: this.mycroftUrls.wordPress + '/media', target: '_blank'},
            {text: 'Privacy Policy', url: this.mycroftUrls.wordPress + '/embed-privacy-policy', target: '_blank'},
            {text: 'Terms of Use', url: this.mycroftUrls.wordPress + '/embed-terms-of-use', target: '_blank'}
        ];
    }

    private defineAboutNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Team', url: this.mycroftUrls.wordPress + '/team', target: '_blank'},
                {text: 'Careers', url: this.mycroftUrls.wordPress + '/careers', target: '_blank'}
            ],
            icon: faRobot,
            text: 'About Mycroft'
        };
    }

    private defineBlogNav(): PrimaryNavItem {
        return {
            icon: faRss,
            text: 'Blog',
            url: this.mycroftUrls.wordPress + '/blog'
        };
    }

    private defineForumNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Chat', url: this.mycroftUrls.chat, target: '_blank'},
                {text: 'Forum', url: this.mycroftUrls.forum, target: '_blank'}
            ],
            icon: faUsers,
            text: 'Community'
        };
    }

    private defineContributeNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Source Code', url: 'https://github.com/MycroftAI', target: '_blank'},
                {text: 'Translate', url: this.mycroftUrls.translate, target: '_blank'},
                {text: 'Wake Word', url: this.mycroftUrls.precise + '/tag/hey-mycroft', target: '_blank'},
                // TODO: uncomment when the tool is converted to angular
                // {text: 'Speech to Text', url: this.mycroftUrls.account + '/#/deepspeech', target: '_blank'},
                {text: 'Text to Speech', url: this.mycroftUrls.mimic, target: '_blank'}
            ],
            icon: faLightbulb,
            text: 'Contribute'
        };
    }

    private defineGetStartedNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Get Mycroft', url: this.mycroftUrls.wordPress + '/download', target: '_blank'},
                {text: 'Documentation', url: this.mycroftUrls.wordPress + '/documentation', target: '_blank'}
            ],
            icon: faRocket,
            text: 'Get Started'
        };
    }

    private defineMarketNav(): PrimaryNavItem {
        return {
            children: [
                {text: 'Skills', url: this.mycroftUrls.marketplace + '/skills', target: '_self'},
                {text: 'Hardware', url: this.mycroftUrls.wordPress + '/shop', target: '_blank'}
            ],
            icon: faStore,
            text: 'Marketplace'
        };
    }
}
