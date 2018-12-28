export enum UserConferenceStatus {
    ADDED = 'added',
    REMOVED = 'removed'
}

export interface UserConference {
    id: string;
    userId: string;
    conferenceId: string;
    status: UserConferenceStatus;
    createdAt: Date;
    updatedAt: Date;
}
