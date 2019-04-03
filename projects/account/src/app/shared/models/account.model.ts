import { AccountAgreement } from '@account/models/account-agreement.model';
import { AccountMembership } from '@account/models/account-membership.model';

export interface Account {
    id: string;
    emailAddress: string;
    username: string;
    membership: AccountMembership;
    agreements: AccountAgreement[];
}
