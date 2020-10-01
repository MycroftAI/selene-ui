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
import { Component, Input, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { faComment } from '@fortawesome/free-solid-svg-icons';

import { AvailableSkill } from '../../skills.service';
import { InstallService } from '../../install.service';

const fiveSeconds = 5000;

@Component({
    selector: 'market-skill-card',
    templateUrl: './skill-card.component.html',
    styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent implements OnInit {
    @Input() public skill: AvailableSkill;
    public voiceIcon = faComment;

    constructor(
        public installSnackbar: MatSnackBar,
        private installService: InstallService) {

    }

    ngOnInit() {
        this.installService.statusNotifications.subscribe(
            (statusChange) => {
                this.showStatusNotifications(statusChange);
            }
        );
    }

    showStatusNotifications(statusChange: string[]) {
        let notificationMessage: string;
        const [skillId, notificationStatus] = statusChange;
        if (this.skill.id === skillId) {
            switch (notificationStatus) {
                case ('installed'): {
                    notificationMessage = 'The ' + this.skill.displayName + ' skill has ' +
                        'been added to all your devices.';
                    this.showInstallStatusNotification(notificationMessage);
                    break;
                }
                case ('uninstalled'): {
                    notificationMessage = 'The ' + this.skill.displayName + ' skill has ' +
                        'been removed from all your devices.';
                    this.showInstallStatusNotification(notificationMessage);
                    break;
                }
                case ('install failed'): {
                    notificationMessage = 'The ' + this.skill.displayName + ' failed to ' +
                        'install to one or more of your devices.  Install will be ' +
                        'retried until successful';
                    this.showInstallStatusNotification(notificationMessage);
                    break;
                }
                case ('uninstall failed'): {
                    notificationMessage = 'The ' + this.skill.displayName + ' failed to ' +
                        'uninstall from one or more of your devices.  Uninstall ' +
                        'will be retried until successful';
                    this.showInstallStatusNotification(notificationMessage);
                }
            }
        }
    }

    showInstallStatusNotification(notificationMessage: string) {
        this.installSnackbar.open(
            notificationMessage,
            '',
            {panelClass: 'profile-snackbar', duration: fiveSeconds}
        );
    }
}
