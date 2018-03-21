export interface TextCorpus {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    userId: string;
    body: string;
    parsedBody: string;
}
