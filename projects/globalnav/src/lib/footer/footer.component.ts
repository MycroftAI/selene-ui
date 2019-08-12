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

import { NavItem } from '../globalnav.service';

import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faMedium,
    faReddit,
    faTelegram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'globalnav-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    @Input() footerItems: NavItem[];
    public socialMediaIcons = [
        {icon: faTwitter, url: 'https://twitter.com/mycroft_ai'},
        {icon: faFacebook, url: 'https://www.facebook.com/aiforeveryone/'},
        {icon: faInstagram, url: 'https://www.instagram.com/mycroft_ai/'},
        {icon: faYoutube, url: 'https://www.youtube.com/channel/UC1dlmB1lup9RwFQBSGnhA-g'},
        {icon: faTelegram, url: 'https://t.me/mycroft_ai'},
        {icon: faReddit, url: 'https://www.reddit.com/r/Mycroftai/'},
        {icon: faLinkedin, url: 'https://www.linkedin.com/company/mycroft-a.i./'},
        {icon: faMedium, url: 'https://medium.com/@mycroftai'}
    ];

    constructor() { }

    ngOnInit() {
    }
}
