import { SettingsDisplay } from '@account/models/settings-display.model';

export interface SkillSettings {
    settingsDisplay: SettingsDisplay;
    settingsValues: any;
    deviceNames: string[];
}
