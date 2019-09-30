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

/**
 * Format the header portion of a skill summary card.  This includes the icon
 * for the skill and a Mycroft logo if the skill is authored by Mycroft AI.
 */
import { Component, Input, OnInit } from '@angular/core';
import { AvailableSkill } from '../../skills.service';
import { InstallService } from '../../install.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'market-skill-card-header',
    templateUrl: './skill-card-header.component.html',
    styleUrls: ['./skill-card-header.component.scss']
})
export class SkillCardHeaderComponent implements OnInit {
    public isInstalled: boolean;
    public installedIcon = faCheckCircle;
    @Input() public skill: AvailableSkill;

    constructor(private installService: InstallService) { }

    /**
     * Include the Mycroft AI logo in the card header if Mycroft authored the skill
     */
    ngOnInit() {
        this.installService.installStatuses.subscribe(
            (installStatuses) => {
                const installStatus = this.installService.getSkillInstallStatus(
                    this.skill.id,
                    this.skill.isSystemSkill,
                    installStatuses
                );
                this.isInstalled = ['system', 'installed'].includes(installStatus);
            }
        );
    }
}
