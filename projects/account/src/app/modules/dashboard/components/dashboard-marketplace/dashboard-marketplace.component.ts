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

import { Component, OnInit } from '@angular/core';

import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';

@Component({
  selector: 'account-dashboard-marketplace',
  templateUrl: './dashboard-marketplace.component.html',
  styleUrls: ['./dashboard-marketplace.component.scss']
})
export class DashboardMarketplaceComponent implements OnInit {
    public downloadIcon = faDownload;
    public marketplaceUrl = environment.mycroftUrls.marketplace;

    constructor() { }

    ngOnInit(): void {
  }

}
