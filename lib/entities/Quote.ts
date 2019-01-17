import { Person } from './Person';

export interface Quote {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    personId: string;
    articleId: string;
    text: string;
    term: string;
    importanceScore: number;
    person?: Person;
    reactions?: object;
}
