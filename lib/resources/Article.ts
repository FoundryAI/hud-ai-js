import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { Article, ArticleSearchResult } from '../entities';

export interface ArticleListAttributes extends HudAiListAttributes {
    companyId?: string;
    importanceScoreMin?: number;
    keyTerm?: string;
    linkHash?: string;
    publishedAfter?: Date;
    publishedBefore?: Date;
    type?: string;
}

export interface ArticleListResults {
    count: number,
    rows: Article[]
}

export interface ArticleCreateAttributes extends HudAiCreateAttributes {
    imageUrl?: string;
    importanceScore?: number;
    localScore?: number;
    linkUrl: string;
    publishedAt?: Date;
    rawDataUrl: string;
    sourceUrl: string;
    text?: string;
    title: string;
    type: string;
}

export interface ArticleUpdateAttributes extends HudAiUpdateAttributes {
    imageUrl?: string;
    importanceScore?: number;
    localScore?: number;
    linkUrl?: string;
    publishedAt?: Date;
    rawDataUrl?: string;
    sourceUrl?: string;
    text?: string;
    title?: string;
    type?: string;
}

export interface ArticleSearchAttributes {
    limit?: number,
    offset?: number,
    companyId?: string | string[];
    createdAfter?: Date,
    createdBefore?: Date,
    keyTerms?: string[],
    maxImportance?: number,
    maxLocal?: number,
    minImportance?: number,
    minLocal?: number,
    groupId?: string,
    publishedAfter?: Date,
    publishedBefore?: Date,
    scoredAfter?: Date,
    scoredBefore?: Date,
    tags?: string[],
    text?: string,
    type?: string,
}

export interface ArticleSearchResults {
    count: number,
    rows: ArticleSearchResult[]
}

export interface ArticleSearchRelevantAttributes {
    limit?: number,
    offset?: number,
    createdAfter?: Date,
    createdBefore?: Date,
    keyTerms?: string[],
    maxImportance?: number,
    maxLocal?: number,
    maxRelevance?: number,
    minImportance?: number,
    minLocal?: number,
    minRelevance?: number,
    publishedAfter?: Date,
    publishedBefore?: Date,
    scoredAfter?: Date,
    scoredBefore?: Date,
    tags?: string[],
    text?: string,
    type?: string,
    userId?: string,
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

    public list(listArgs: ArticleListAttributes): Promise<ArticleListResults> {
        return this._list(listArgs);
    }

    public search(searchArgs: ArticleSearchAttributes): Promise<ArticleSearchResults> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search`
        })
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
