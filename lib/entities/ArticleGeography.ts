export interface BasicArticleGeography {
    geography: string;
}

export interface ArticleGeography extends BasicArticleGeography {
    id: string;
    articleId: string;
    geography: string;
    createdAt: Date;
    updatedAt: Date;
}
