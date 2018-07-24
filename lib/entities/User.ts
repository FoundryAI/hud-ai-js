export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    linkedinProfileId?: string | null;
    salesforceProfileId?: string | null;
    organizationId?: string;
}
