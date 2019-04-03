import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SettingChange } from '@account/models/setting-change.model';
import { Skill } from '@account/models/skill.model';
import { SkillSettings } from '@account/models/skill-settings.model';
import { SkillService } from '@account/http/skill.service';

@Component({
    selector: 'account-skill-settings',
    templateUrl: './skill-settings.component.html',
    styleUrls: ['./skill-settings.component.scss']
})
export class SkillSettingsComponent implements OnInit {
    public disableSave = true;
    @Input() deviceCount: number;
    @Input() skill: Skill;
    public skillSettings$: Observable<SkillSettings[]>;
    public skillSettings: SkillSettings[];
    @Output() done = new EventEmitter();

    constructor(private skillService: SkillService) { }

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

    getGroupNumber(settingsGroup, settings): number {
        return settings.findIndex((group) => group === settingsGroup) + 1;
    }

    saveSettings(): void {
        this.skillService.updateSkillSettings(this.skill.id, this.skillSettings);
        this.done.emit();
    }

    onCancelClick() {
        this.done.emit();
    }

}
