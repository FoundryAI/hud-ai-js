import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import {Session} from '../Session';
import * as Promise from 'bluebird';

export interface Article {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    title: string;
    text: string;
    imageUrl: string;
    rawDataUrl: string;
    importanceScore: number;
    linkHash: string;
    linkUrl: string;
    sourceUrl: string;
    publishedAt: Date;
    authors: any[]; // TODO: types
    articleKeyTerms: any[]; // TODO: types
}

export interface ArticleListAttributes extends HudAiListAttributes {
    type?: string;
    importanceScoreMin?: number;
    keyTerm?: string;
    linkHash?: string;
    publishedAfter?: Date;
    publishedBefore?: Date;
}

export interface ArticleCreateAttributes extends HudAiCreateAttributes {
    authors?: string[];
    imageUrl?: string;
    importanceScore?: number;
    linkHash?: string;
    linkUrl: string;
    publishedAt?: Date;
    rawDataUrl: string;
    sourceUrl: string;
    text?: string;
    title: string;
    type: string;
}

export interface ArticleUpdateAttributes extends HudAiUpdateAttributes {
    authors?: string[];
    imageUrl?: string;
    importanceScore?: number;
    linkUrl?: string;
    publishedAt?: Date;
    rawDataUrl?: string;
    sourceUrl?: string;
    text?: string;
    title?: string;
    type?: string;
}

export class ArticleResource extends Resource<Article, ArticleListAttributes, ArticleCreateAttributes, ArticleUpdateAttributes> {
    constructor(apiSession: Session, requestManager: RequestManager) {
        super('/articles', apiSession, requestManager);
    }
}
