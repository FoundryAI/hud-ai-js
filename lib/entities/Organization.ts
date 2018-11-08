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

export interface OrganizationUserRole {
    userId: string;
    organizationId: string;
    role: 'admin' | 'owner' | 'manager' | 'member';
    createdAt: Date;
    updatedAt: Date;
}

export interface OrganizationFeedSettings {
    id: string;
    organizationId: string;
    importance: number|null;
    article: number|null;
    tweet: number|null;
    quote: number|null;
    stockAlert: number|null;
    video: number|null;
    businessWord: number|null;
    feedContext: number|null;
    followedPerson: number|null;
    industryTerm: number|null;
    jobFunctionTerm: number|null;
    corpusTerm: number|null;
    source: number|null;
    minImportance: number|null;
    decay: number|null;
    decayOffset: string|null;
    createdAt: Date;
    updatedAt: Date;
}