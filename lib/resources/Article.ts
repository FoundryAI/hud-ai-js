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
    articleKeyTerms: string[];
    authors: string[];
    imageUrl: string;
    importanceScore: number;
    linkHash: string;
    linkUrl: string;
    publishedAt: Date;
    rawDataUrl: string;
    sourceUrl: string;
    text: string;
    title: string;
    type: string;
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

    public list(listArgs: ArticleListAttributes): Promise<{ count: number, rows: Article[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: ArticleCreateAttributes): Promise<Article> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Article> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: ArticleUpdateAttributes): Promise<Article> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
