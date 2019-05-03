import * as Promise from 'bluebird';

import { HudAiListAttributes, Resource } from '../utils/Resource';
import { RequestManager } from '../RequestManager';

import { FeedItem } from '../entities';

export interface FeedFetchAttributes extends HudAiListAttributes {
    userId: string;
    text?: string;
    tags?: string[];
    geographies?: string[];
    types?: string[];
    keyTerms?: string[];
    itemIds?: string[] | string;
    companyIds?: string[] | string;
    sourceIds?: string[] | string;
    peopleIds?: string[] | string;
    minImportance?: number;
    minLocal?: number;
    maxImportance?: number;
    maxLocal?: number;
    publishedBefore?: Date;
    publishedAfter?: Date;
    scoredBefore?: Date;
    scoredAfter?: Date;
    weights?: {
        importance?: number;
        article?: number;
        tweet?: number;
        stockAlert?: number;
        video?: number;
        quote?: number;
        decay?: number;
        decayOffset?: string;
        decayScale?: string;
        businessWord?: number;
        industryTerm?: number;
        jobFunctionTerm?: number;
        corpusTerm?: number;
        source?: number;
        followedCompany?: number;
        followedPerson?: number;
    }
}

export interface GroupedTagCount {
    [term: string]: {
        [tag: string]: number
    };
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

    public generateHeatmap(countArgs: FeedFetchAttributes): Promise<GroupedTagCount> {
        return this.makeRequest({
            method: 'GET',
            params: countArgs,
            url: `${this.basePath}/heatmap`
        })
    }
}
