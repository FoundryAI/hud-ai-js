export interface BasicAuthor {
    name: string;
}

export interface Author extends BasicAuthor {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}
