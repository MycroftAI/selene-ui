import { WakeWord } from '@account/models/wake-word.model';
import { Voice } from '@account/models/voice.model';
import { City } from '@account/models/city.model';
import { Country } from '@account/models/country.model';
import { Region } from '@account/models/region.model';
import { Timezone } from '@account/models/timezone.model';

export interface Device {
    city: City;
    coreVersion: string;
    country: Country;
    disconnectDuration: string;
    enclosureVersion: string;
    id: string;
    name: string;
    placement: string;
    platform: string;
    region: Region;
    status: string;
    timezone: Timezone;
    voice: Voice;
    wakeWord: WakeWord;
}
