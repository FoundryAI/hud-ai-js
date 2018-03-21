export interface Collateral {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    contentUrl: string;
    plaintextUrl: string;
    filetype: string;
    size: number;
    dataScienceMetadata: Object;
    createdAt: Date;
    updatedAt: Date;
}
