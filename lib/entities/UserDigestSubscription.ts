export interface UserDigestSubscription {
    id: string;
    dayOfWeek: string;
    isoHour: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}
