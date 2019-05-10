export interface UserFeedSetting {
    id: string;
    userId: string;
    recency?: number;
    showLocal?: boolean;
    showForeign?: boolean;
    companiesWeight?: number;
    peopleWeight?: number;
    interestsWeight?: number;
    sourcesWeight?: number;
    quotesWeight?: number;
    videosWeight?: number;
    createdAt: Date;
    updatedAt: Date;
}
