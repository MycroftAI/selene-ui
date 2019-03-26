import { SettingField } from '@account/models/setting-field.model';

export interface SettingSection {
    name: string;
    fields: SettingField[];
}
