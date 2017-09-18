import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

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
    authors: string[];
    articleKeyTerms: string[];
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

export class ArticleResource extends Resource<
    Article,
    ArticleListAttributes,
    ArticleCreateAttributes,
    ArticleUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/articles', requestManager);
    }

    public get(id: string | number): Promise<Article> {
        return this._get(id);
    }

    public list(listArgs: ArticleListAttributes): Promise<Article[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: ArticleUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: ArticleCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this._del(id);
    }
}
