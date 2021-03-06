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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SettingChange } from '@account/models/setting-change.model';
import { SkillFamily } from '@account/models/skill_family.model';
import { SkillSettings } from '@account/models/skill-settings.model';
import { SkillService } from '@account/http/skill.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'shared';

const fiveSeconds = 5000;

@Component({
    selector: 'account-skill-settings',
    templateUrl: './skill-settings.component.html',
    styleUrls: ['./skill-settings.component.scss']
})
export class SkillSettingsComponent implements OnInit {
    public disableSave = true;
    @Input() deviceCount: number;
    private snackbarConfig = new MatSnackBarConfig();
    @Input() skill: SkillFamily;
    public skillSettings$: Observable<SkillSettings[]>;
    public skillSettings: SkillSettings[];
    @Output() done = new EventEmitter();

    constructor(private snackbar: MatSnackBar, private skillService: SkillService) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
        this.skillSettings$ = this.skillService.getSkillSettings(this.skill.familyName).pipe(
            tap((skillSettings) => { this.skillSettings = skillSettings; })
        );
    }

    buildDeviceList(settingsGroup: SkillSettings): string {
        let deviceList: string;
        if (settingsGroup.deviceNames.length === this.deviceCount) {
            deviceList = 'This skill is installed on all devices';
        } else {
            deviceList = settingsGroup.deviceNames.join(', ');
        }

        return deviceList;
    }

    onValueChange(skillSettings: SkillSettings, newValue: SettingChange): void {
        this.disableSave = false;
        const settingsToChange = this.skillSettings.find(
            (settings) => settings.settingsValues === skillSettings.settingsValues
        );
        settingsToChange.settingsValues[newValue.name] = newValue.value;
    }

    onSkillOauth(oauthId: string) {
        this.skillService.authenticateSkill(oauthId).subscribe(
            (result) => { window.open(result.url); }
        );
    }

    getGroupNumber(settingsGroup, settings): number {
        return settings.findIndex((group) => group === settingsGroup) + 1;
    }

    saveSettings(): void {
        this.skillService.updateSkillSettings(this.skill, this.skillSettings).subscribe(
            () => { this.openSuccessSnackbar(); },
            () => { this.openErrorSnackbar(); }
        );
        this.done.emit();
    }

    openErrorSnackbar() {
        const config = new MatSnackBarConfig();
        config.data = {
            type: 'error',
            message: 'Error saving changes to ' + this.skill.name + ' settings'
        };
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

    openSuccessSnackbar() {
        const config = new MatSnackBarConfig();
        config.data = {
            type: 'success',
            message: 'Changes to ' + this.skill.name + ' settings saved'};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

    onCancelClick() {
        this.done.emit();
    }

}
