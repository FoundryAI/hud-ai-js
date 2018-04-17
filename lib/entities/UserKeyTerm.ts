import { BasicKeyTerm } from './KeyTerm';

export interface UserKeyTerm extends BasicKeyTerm {
    id: string;
    userId?: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}
