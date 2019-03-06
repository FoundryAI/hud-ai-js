import * as Promise from 'bluebird';

import { HudAiListAttributes, Resource } from '../utils/Resource';
import { RequestManager } from '../RequestManager';

import { FeedItem } from '../entities';

export interface FeedFetchAttributes extends HudAiListAttributes {
    userId: string;
    itemIds?: string[] | string;
    companyIds?: string[] | string;
    keyTerms?: string[];
    maxImportance?: number;
    maxRelevance?: number;
    maxLocal?: number;
    minImportance?: number;
    minRelevance?: number;
    minLocal?: number;
    publishedAfter?: Date;
    publishedBefore?: Date;
    scoredAfter?: Date;
    scoredBefore?: Date;
    sourceIds?: string[] | string;
    tags?: string[];
    text?: string;
    types?: string[];
    weights?: {
        decayOffset?: string;
        decay?: number;
        importance?: number;
        article?: number;
        tweet?: number;
        stockAlert?: number;
        quote?: number;
        video?: number;
        businessWord?: number;
        industryTerm?: number;
        jobFunctionTerm?: number;
        corpusTerm?: number;
        source?: number;
        feedContext?: number;
        followedPerson?: number;
    }
}

export class FeedResource extends Resource<FeedItem, any, any, any> {
    constructor(requestManager: RequestManager) {
        super('/users/feed', requestManager);
    }

    public fetch(fetchArgs: FeedFetchAttributes): Promise<{ count: number, rows: FeedItem[] }> {
        return this.makeRequest({
            method: 'GET',
            params: fetchArgs,
            url: `${this.basePath}`
        })
    }

    public refreshIndex(index: string) {
        return this.makeRequest({
            method: 'GET',
            params: { index },
            url: `${this.basePath}/refreshIndex`
        })
    }

    public createIndex(index: string) {
        return this.makeRequest({
            method: 'GET',
            params: { index },
            url: `${this.basePath}/createIndex`
        })
    }

    public getOrCreateIndex(index: string) {
        return this.makeRequest({
            method: 'GET',
            params: { index },
            url: `${this.basePath}/getOrCreateIndex`
        })
    }

    public destroyIndex(index: string) {
        return this.makeRequest({
            method: 'GET',
            params: { index },
            url: `${this.basePath}/destroyIndex`
        })
    }
}
