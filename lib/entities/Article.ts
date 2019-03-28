import { ArticleKeyTerm } from './ArticleKeyTerm';
import { Author, BasicAuthor } from './Author';
import { ArticleTag, BasicArticleTag } from './ArticleTag';
import { ArticleGeography, BasicArticleGeography } from './ArticleGeography';
import { BasicKeyTerm } from './KeyTerm';
import { BasicArticleCompany } from './ArticleCompany';
import { BasicArticlePerson } from './ArticlePerson';

export interface Article extends BasicArticle {
    keyTerms?: ArticleKeyTerm[];
    authors?: Author[];
    tags?: ArticleTag[];
    geographies?: ArticleGeography[];
    linkHash: string;
    rawDataUrl: string;
    sourceUrl: string;
}

export interface BasicArticle {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    keyTerms?: BasicKeyTerm[];
    authors?: BasicAuthor[];
    tags?: BasicArticleTag[];
    geographies?: BasicArticleGeography[];
    imageUrl: string;
    importanceScore: number;
    linkUrl: string;
    sourceId: string;
    publishedAt: Date;
    text: string;
    title: string;
    type: string;
}

export interface ArticleSearchResult extends BasicArticle {
    groupId?: string;
    reactions?: object;
    localScore?: number;
    authors: BasicAuthor[];
    companies: BasicArticleCompany[];
    keyTerms: BasicKeyTerm[];
    tags: BasicArticleTag[];
    geographies: BasicArticleGeography[];
    people: BasicArticlePerson[];
}
