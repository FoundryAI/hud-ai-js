export interface BasicArticleTag {
    tag: string;
}

export interface ArticleTag extends BasicArticleTag {
    id: string;
    articleId: string;
    tag: string;
    createdAt: Date;
    updatedAt: Date;
}
