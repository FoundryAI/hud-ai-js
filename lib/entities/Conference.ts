export interface Conference {
    id: string;
    name: string;
    description: string|null;
    url: string|null;
    timezone: string|null;
    speakersJobId: string|null;
    createdAt: Date;
    updatedAt: Date;
}
