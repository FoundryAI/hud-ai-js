import {Conference} from './Conference';

export interface ConferenceLocation {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    conferenceId: string;
    conference?: Conference;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    zip: string;
    country: string;
}