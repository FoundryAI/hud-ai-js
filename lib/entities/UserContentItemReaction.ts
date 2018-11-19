export interface UserContentItemReaction {
    id: string;
    userId: string;
    contentType: string;
    contentId: string;
    reaction: string;
    createdAt: Date;
    updatedAt: Date;
}
