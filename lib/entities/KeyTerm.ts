export interface KeyTerm extends BasicKeyTerm {
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BasicKeyTerm {
    term: string;
}
