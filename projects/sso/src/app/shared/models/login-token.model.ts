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

/**
 * This model is used to communicate user credentials to the backend.  Security best practices
 * dictate that human-readable user-identifiable information should not be included in API requests.
 * To comply with this, we use authentication tokens from federated login platforms to obtain user
 * data on the backend.  Authentication via email address will pass an obfuscated version of the
 * user's email address to this model.
 */

export type PlatformType = 'Facebook' | 'Google' | 'GitHub' | 'Internal';

export interface LoginToken {
    platform: PlatformType;
    token: string;
}
