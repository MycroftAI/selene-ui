import { DeviceAttribute } from './deviceAttribute.model';
import { Geography } from './geography.model';

export interface AccountPreferences {
    dateFormat: string;
    geography: Geography;
    location: DeviceAttribute;
    measurementSystem: string;
    timeFormat: string;
    voice: DeviceAttribute;
    wakeWord: DeviceAttribute;
}
