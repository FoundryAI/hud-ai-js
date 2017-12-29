import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {Article} from './Article';
import {Quote} from './Quote';
import {Tweet} from './Tweet';

export interface FeedFetchAttributes extends HudAiListAttributes {
    userId?: string;
    text?: string;
    tags?: string[];
    keyTerms?: string[];
    minRelevance?: number;
    maxRelevance?: number;
    publishedBefore?: Date;
    publishedAfter?: Date;
}

export class FeedResource extends Resource<Article|Quote|Tweet, HudAiListAttributes, HudAiCreateAttributes, HudAiUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/users/feeds', requestManager);
    }

    public fetch(fetchArgs: FeedFetchAttributes): Promise<{ count: number, rows: [Article|Quote|Tweet] }> {
        return this.makeRequest({
            method: 'GET',
            params: fetchArgs,
            url: `${this.basePath}`
        })
    }
}
