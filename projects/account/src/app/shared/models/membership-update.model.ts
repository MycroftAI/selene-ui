export interface MembershipUpdate {
    membershipType?: string;
    newMembership: boolean;
    paymentMethod?: string;
    paymentToken?: string;
}
