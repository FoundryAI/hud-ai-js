import { BasicKeyTerm } from './KeyTerm';

export interface ArticleKeyTerm extends BasicArticleKeyTerm {
    id: string;
    articleId: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BasicArticleKeyTerm extends BasicKeyTerm {
    term: string;
}
