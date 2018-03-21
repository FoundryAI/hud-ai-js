import * as Promise from 'bluebird';

import { HudAiListAttributes, Resource } from '../utils/Resource';
import { RequestManager } from '../RequestManager';

import { FeedItem } from '../entities';

export interface FeedFetchAttributes extends HudAiListAttributes {
    userId?: string;
    text?: string;
    tags?: string[];
    keyTerms?: string[];
    companyIds?: string[]|string;
    sourceIds?: string[]|string;
    minImportance?: number;
    maxImportance?: number;
    minRelevance?: number;
    maxRelevance?: number;
    publishedBefore?: Date;
    publishedAfter?: Date;
    scoredBefore?: Date;
    scoredAfter?: Date;
    weights?: {
        importance: number;
        article: number;
        tweet: number;
        quote: number;
        businessWord: number;
        industryTerm: number;
        corpusTerm: number;
        source: number;
        feedContext: number;
        followedPerson: number;
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
}
