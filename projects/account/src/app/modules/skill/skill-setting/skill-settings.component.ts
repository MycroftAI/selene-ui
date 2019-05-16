import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SettingChange } from '@account/models/setting-change.model';
import { Skill } from '@account/models/skill.model';
import { SkillSettings } from '@account/models/skill-settings.model';
import { SkillService } from '@account/http/skill.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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
    @Input() skill: Skill;
    public skillSettings$: Observable<SkillSettings[]>;
    public skillSettings: SkillSettings[];
    @Output() done = new EventEmitter();

    constructor(private snackbar: MatSnackBar, private skillService: SkillService) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
        this.skillSettings$ = this.skillService.getSkillSettings(this.skill.id).pipe(
            tap((skillSettings) => { this.skillSettings = skillSettings; })
        );
    }

    onValueChange(skillSettings: SkillSettings, newValue: SettingChange): void {
        this.disableSave = false;
        const settingsToChange = this.skillSettings.find(
            (settings) => settings.settingsValues = skillSettings.settingsValues
        );
        settingsToChange.settingsValues[newValue.name] = newValue.value;
    }

    onSkillOauth(oauthId: string) {
        this.skillService.authenticateSkill(oauthId).subscribe(
            (result) => { window.location.assign(result.url); }
        );
    }

    getGroupNumber(settingsGroup, settings): number {
        return settings.findIndex((group) => group === settingsGroup) + 1;
    }

    saveSettings(): void {
        this.skillService.updateSkillSettings(this.skill.id, this.skillSettings).subscribe(
            () => {
                this.snackbar.open(
                    'Changes to ' + this.skill.name + 'settings saved',
                    null,
                    this.snackbarConfig
                );
            },
            () => {
                this.snackbar.open(
                    'Error saving changes to ' + this.skill.name + ' settings',
                    null,
                    this.snackbarConfig
                );
            }
        );
        this.done.emit();
    }

    onCancelClick() {
        this.done.emit();
    }

}
