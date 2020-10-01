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
 * This component does all things install button, which is a lot of things.
 */
import { Component, Input, OnInit } from '@angular/core';
import { AvailableSkill } from '../skills.service';

import { InstallService } from '../install.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { MatSnackBar } from '@angular/material/snack-bar';

const fiveSeconds = 5000;
const tenSeconds = 10000;


@Component({
  selector: 'market-skill-install-button',
  templateUrl: './install-button.component.html',
  styleUrls: ['./install-button.component.scss']
})
export class InstallButtonComponent implements OnInit {
    public addIcon = faPlusCircle;
    @Input() private component: string;
    public installButtonStyle: object;
    public installStatus: string;
    public removeIcon = faTrash;
    @Input() public skill: AvailableSkill;
    public skillLocked = faLock;

    constructor(private installSnackbar: MatSnackBar, private installService: InstallService) { }

    ngOnInit() {
        this.installService.installStatuses.subscribe(
            (installStatuses) => {
                this.installStatus = this.installService.getSkillInstallStatus(
                    this.skill.id,
                    this.skill.isSystemSkill,
                    installStatuses
                );
            }
        );
        this.applyInstallButtonStyle();
    }

    /**
     * Some of the install button style elements are different depending on
     * which component it is displayed within.  Use the ngStyle directive
     * to specify these styles.
     */
    applyInstallButtonStyle() {
        if (this.component === 'skillDetail') {
            this.installButtonStyle = {'width': '150px'};
        } else if (this.component === 'skillSummary') {
            this.installButtonStyle = {'width': '320px', 'margin-bottom': '8px'};
        }
    }

    /**
     * Install a skill onto one or many devices
     */
    install_skill(): void {
        this.installService.addToInstallQueue(this.skill.id).subscribe(
            (response) => {
                this.onInstallSuccess(response);
            },
            (response) => {
                this.onInstallFailure(response);
            }
        );
    }

    /**
     * Handle the successful install request
     *
     * This does not indicate that the install of the skill completed, only
     * that the request to install a skill succeeded.  Change the install
     * button to an 'installing' state.
     *
     * @param response: response object from the install endpoint
     */
    onInstallSuccess(response): void {
        this.installService.newInstallStatuses[this.skill.id] = 'installing';
        this.installService.applyInstallStatusChanges();
        this.installService.checkInstallationsInProgress();
        this.installSnackbar.open(
            'The ' + this.skill.displayName + ' skill is being added ' +
            'to your devices.  Please allow up to two minutes for ' +
            'installation to complete before using the skill.',
            null,
            {panelClass: 'mycroft-snackbar', duration: tenSeconds}
        );
    }

    /**
     * Handle the failure to install a skill.
     *
     * If a user attempts to install a skill without being logged in, show a
     * snackbar to notify the user and give them the ability to log in.
     *
     * @param response - object representing the response from the API call
     */
    onInstallFailure(response): void {
        if (response.status === 401) {
            this.installSnackbar.open(
                'To install a skill, log in to your account.',
                'LOG IN',
                {panelClass: 'mycroft-snackbar', duration: fiveSeconds}
            );
        }
    }

    /**
     * Remove a skill from one or many devices
     */
    uninstallSkill(): void {
        this.installService.addToUninstallQueue(this.skill.id).subscribe(
            (response) => {
                this.onUninstallSuccess(response);
            },
        );
    }

    /**
     * Handle the successful install request
     *
     * This does not indicate that the install of the skill completed, only
     * that the request to install a skill succeeded.  Change the install
     * button to an 'installing' state.
     *
     * @param response - object representing the response from the API call
     */
    onUninstallSuccess(response): void {
        this.installService.newInstallStatuses[this.skill.id] = 'uninstalling';
        this.installService.applyInstallStatusChanges();
        this.installService.checkInstallationsInProgress();
        this.installSnackbar.open(
            'The ' + this.skill.displayName + ' skill is ' +
            'uninstalling.  Please allow up to a minute for the skill to be ' +
            'removed from devices.',
            null,
            {panelClass: 'mycroft-snackbar', duration: tenSeconds}
        );
    }
}

