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
    authors?: string[];
    imageUrl?: string;
    importanceScore?: number;
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

export interface ArticleSearchAttributes {
    limit?: number,
    offset?: number,
    authors?: string[],
    companyId?: string | string[];
    createdAfter?: Date,
    createdBefore?: Date,
    keyTerms?: string[],
    maxImportance?: number,
    maxIsLocal?: number,
    minImportance?: number,
    minIsLocal?: number,
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
    authors?: string[],
    createdAfter?: Date,
    createdBefore?: Date,
    keyTerms?: string[],
    maxImportance?: number,
    maxIsLocal?: number,
    maxRelevance?: number,
    minImportance?: number,
    minIsLocal?: number,
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

export interface GroupedTagCount {
    [term: string]: {
        [tag: string]: number
    };
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

    public searchRelevant(searchArgs: ArticleSearchRelevantAttributes): Promise<ArticleSearchResults> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search/relevant`
        })
    }

    public searchRelevantByTerm(searchArgs: ArticleSearchRelevantAttributes): Promise<{ term: string, count: number, rows: ArticleSearchResult[] }[]> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search/relevant/grouped/by-term`
        })
    }

    public searchRelevantByTermAndCountTags(countArgs: ArticleSearchRelevantAttributes): Promise<GroupedTagCount> {
        return this.makeRequest({
            method: 'GET',
            params: _.merge(countArgs, { countTags: true }),
            url: `${this.basePath}/search/relevant/grouped/by-term`
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
