import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface Quote {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    personId: string;
    articleId: string;
    text: string;
}

export interface QuoteGetAttributes {
    id: string;
}

export interface QuoteListAttributes extends HudAiListAttributes {
    personId?: string;
    articleId?: string;
    term?: string;
}

export interface QuoteCreateAttributes extends HudAiCreateAttributes {
    personId: string;
    articleId: string;
    text: string;
    term: string;
}

export interface QuoteDestroyAttributes {
    id: string;
}

export class QuoteResource extends Resource<
    Quote,
    QuoteListAttributes,
    QuoteCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/people/quotes', requestManager);
    }

    public get(getArgs: QuoteGetAttributes): Promise<Quote> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        });
    }

    public list(listArgs: QuoteListAttributes): Promise<Quote[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        });
    }

    public create(createArgs: QuoteCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        });
    }

    public del(destroyArgs: QuoteDestroyAttributes) {
        return this.destroy(destroyArgs);
    }

    public destroy(destroyArgs: QuoteDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            data: destroyArgs,
            url: `${this.basePath}/{term}`
        });
    }
}
