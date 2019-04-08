import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface WebApps {
    account: string;
    chat: string;
    forum: string;
    marketplace: string;
    mimic: string;
    singleSignOn: string;
    translate: string;
    wordPress: string;
}

export interface NavItem {
  text: string;
  url: string;
  target: string;
}

export interface PrimaryNavItem {
  children?: NavItem[];
  icon: IconDefinition;
  text: string;
  url?: string;
}

/**
 * We use two tokens for authentication, and access token and a refresh token.
 * Using the existence of an access token to determine if a user is logged in
 * (as this code once did) is problematic because the access token is valid
 * for a short period of time. Once the access token cookie expires, the cookie
 * is deleted and not refreshed until the next API call.  This was causing a user
 * to appear to be logged out when they were in fact logged in.  The refresh token
 * has a longer term expiration.  When it expires, we will expect the user to log
 * back in.  So now we use the refresh token to determine the login status.
 */
export function setLoginStatus(): boolean {
    const cookies = document.cookie;
    const seleneTokenExists = cookies.includes('seleneRefresh');
    const seleneTokenEmpty = cookies.includes('seleneRefresh=""');

    return seleneTokenExists && !seleneTokenEmpty;
}
