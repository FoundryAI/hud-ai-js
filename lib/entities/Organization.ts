export interface Organization {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string|null;
    maxBillableAccounts: number;
    emailDomain: string;
    signedLicenseAgreementAt: Date | null;
    ownerUserId: string;
    planId: string|null;
    subscriptionId: string|null;
    customerId: string|null;
}
