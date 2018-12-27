export enum UserConferenceStatus {
    ADDED = 'ADDED',
    REMOVED = 'REMOVED'
}

export interface UserConference {
    id: string;
    userId: string;
    conferenceId: string;
    status: UserConferenceStatus;
    createdAt: Date;
    updatedAt: Date;
}
