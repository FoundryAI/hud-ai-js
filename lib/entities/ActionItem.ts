export interface ActionItem {
    id: string;
    userId: string;
    actionType: string;
    associatedEntityType: string;
    associatedEntityId: string;
    completedAt?: Date;
    dismissedAt?: Date;
    propensityScore?: number;
    createdAt: Date;
    updatedAt: Date;
    contentItems: ActionItemContentItem[];
}

export interface ActionItemContentItem {
    id: string;
    userId: string;
    actionItemId: string;
    contentType: string;
    contentId: string;
    createdAt: Date;
    updatedAt: Date;
}
