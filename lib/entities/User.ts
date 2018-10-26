export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    phone?: string;
    timezone?: string;
    linkedinProfileId?: string | null;
    salesforceProfileId?: string | null;
    organizationId?: string;
}
