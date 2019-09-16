export interface SelectOptions {
    display: string;
    value: string;
}

export interface SettingField {
    name: string;
    type: string;
    label: string;
    options?: SelectOptions[];
    value?: string | boolean | number;
}
