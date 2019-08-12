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
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SkillFamily } from '@account/models/skill_family.model';
import { SkillService } from '@account/http/skill.service';

export interface WebApps {
    account: string;
    chat: string;
    forum: string;
    marketplace: string;
    mimic: string;
    singleSignOn: string;
    translate: string;
    wordPress: string;
}

@Component({
  selector: 'account-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
    public helpText: string;
    public marketplaceLink: string;
    public moreSkillsText: string;
    public mycroftUrls: WebApps = environment.mycroftUrls;
    public skills$: Observable<SkillFamily[]>;
    public deviceCount: number;

    constructor(private skillService: SkillService) {
    }

    ngOnInit() {
        this.defineAssistiveText();
        this.skills$ = this.skillService.getSkills();
        this.skillService.getDeviceCount().subscribe(
            (result) => { this.deviceCount = result['deviceCount']; }
        );
    }

    private defineAssistiveText() {
        this.helpText = 'Select a skill below to update its settings, ' +
            'see more information about it, or remove it from your device(s).  ' +
            'The cog icons indicate a skills with settings to configure.';
        this.moreSkillsText = 'To add skills to your device(s), you can use voice commands ' +
            '(e.g. "Hey Mycroft, install alarm skill.") or ';
        this.marketplaceLink = 'visit our skill marketplace.';
    }
}
