export interface BasicArticleCompany {
    companyId: string;
}

export interface ArticleCompany extends BasicArticleCompany {
    id: string;
    articleId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
}
