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

import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { PrimaryNavItem } from '../globalnav.service';

@Component({
    selector: 'globalnav-primary-nav-item',
    templateUrl: './primary-nav-item.component.html',
    styleUrls: ['./primary-nav-item.component.scss']
})
export class PrimaryNavItemComponent implements OnInit {
    public expanded = false;
    public expandIcon = faChevronDown;
    public collapseIcon = faChevronUp;
    @Input() primaryNavItem: PrimaryNavItem;

    constructor() { }

    ngOnInit() {
        this.expandCurrentLocation();
    }

    expandCurrentLocation() {
        if (this.primaryNavItem.children && this.primaryNavItem.children.length) {
            this.primaryNavItem.children.forEach(
                (navItem) => {
                    if (window.location.href.includes(navItem.url)) {
                        this.expanded = true;
                    }
                }
            );
        }
    }

    onItemSelected() {
        if (this.primaryNavItem.children && this.primaryNavItem.children.length) {
            this.expanded = !this.expanded;
        } else {
            window.open(this.primaryNavItem.url);
        }
    }
}
