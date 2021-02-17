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

import { City } from '@account/models/city.model';
import { Country } from '@account/models/country.model';
import { PantacorConfig } from '@account/models/pantacorConfig.model';
import { Region } from '@account/models/region.model';
import { Timezone } from '@account/models/timezone.model';
import { WakeWord } from '@account/models/wake-word.model';
import { Voice } from '@account/models/voice.model';

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
    pantacorConfig: PantacorConfig;
    pantacorUpdateId: string;
}
