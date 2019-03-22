import { DeviceAttribute } from './deviceAttribute.model';
import { Geography } from './geography.model';

export interface Device {
    coreVersion: string;
    enclosureVersion: string;
    id: string;
    geography: Geography;
    name: string;
    placement: string;
    platform: string;
    voice: DeviceAttribute;
    wakeWord: DeviceAttribute;
}
