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

@Component({
  selector: 'globalnav-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
    @Input() item: NavItem;
    public navItemStyle: object;

    constructor() {
    }

    ngOnInit() {
        this.buildNavItemStyle();
    }

    buildNavItemStyle() {
        if (window.location.href.includes(this.item.url)) {
            this.navItemStyle = {'color': '#22a7f0'};
        }
    }

    navigateToUrl() {
      window.location.assign(this.item.url);
    }

}
