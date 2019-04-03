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

export function setLoginStatus(): boolean {
    const cookies = document.cookie;
    const seleneTokenExists = cookies.includes('seleneAccess');
    const seleneTokenEmpty = cookies.includes('seleneAccess=""');

    return seleneTokenExists && !seleneTokenEmpty;
}
