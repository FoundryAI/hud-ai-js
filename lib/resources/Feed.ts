import * as Promise from 'bluebird';

import { ArticleSearchResult } from './Article';
import { HudAiListAttributes, Resource } from '../utils/Resource';
import { Quote } from './Quote';
import { RequestManager } from '../RequestManager';
import { Tweet } from './Tweet';

export interface FeedArticle extends ArticleSearchResult {
    _type: 'article';
}

export interface FeedQuote extends Quote {
    _type: 'quote';
}

export interface FeedTweet extends Tweet {
    _type: 'tweet';
}

export type FeedItem = FeedArticle | FeedQuote | FeedTweet;

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
