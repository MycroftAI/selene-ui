import { Country } from './country.model';
import { City } from './city.model';
import { Region } from './region.model';
import { Timezone} from './timezone.model';
import { Voice } from './voice.model';
import { WakeWord } from './wake-word.model';

export interface AccountDefaults {
    id: string;
    country: Country;
    region: Region;
    city: City;
    timezone: Timezone;
    voice: Voice;
    wakeWord: WakeWord;
}
