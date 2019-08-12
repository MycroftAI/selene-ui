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

import { faCog } from '@fortawesome/free-solid-svg-icons';

import { environment } from '@account/environments/environment';
import { SkillFamily } from '@account/models/skill_family.model';

@Component({
    selector: 'account-skill-panel',
    templateUrl: './skill-panel.component.html',
    styleUrls: ['./skill-panel.component.scss']
})
export class SkillPanelComponent implements OnInit {
    public settingsIcon = faCog;
    @Input() deviceCount: number;
    @Input() skill: SkillFamily;
    public panelExpanded = false;
    public marketUrl = environment.mycroftUrls.marketplace + '/skills/';

    constructor() {
    }

    ngOnInit() {
    }

    closePanel() {
        this.panelExpanded = false;
    }
}
