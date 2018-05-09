import {Conference} from './Conference';

export interface ConferenceSpeaker {
    id: string;
    personId: string;
    conferenceId: string|null;
    conference?: Conference;
    createdAt: Date;
    updatedAt: Date;
}
