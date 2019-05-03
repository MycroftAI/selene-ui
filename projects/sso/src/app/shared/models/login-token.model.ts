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
