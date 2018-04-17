import { Person } from './Person';

export interface Tweet {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    twitterCreatedAt: Date;
    personId: string;
    twitterTweetId: string;
    text: string;
    importanceScore: number;
    person?: Person;
}
