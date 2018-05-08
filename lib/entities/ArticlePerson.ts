export interface BasicArticlePerson {
    personId: string;
}

export interface ArticlePerson extends BasicArticlePerson {
    id: string;
    articleId: string;
    personId: string;
    createdAt: Date;
    updatedAt: Date;
}
