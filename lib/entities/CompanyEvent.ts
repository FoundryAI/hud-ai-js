export interface CompanyEvent {
    id: string;
    companyId: string;
    title: string;
    description: string;
    type: string;
    linkUrl: string;
    startsAt: Date;
    endsAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
