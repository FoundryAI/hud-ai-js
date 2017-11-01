import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {Person} from './Person';

export interface Quote {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    personId: string;
    articleId: string;
    text: string;
    term: string;
    person?: Person;
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

    public list(listArgs: QuoteListAttributes): Promise<{ count: number, rows: Quote[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        });
    }

    public create(createArgs: QuoteCreateAttributes): Promise<Quote> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        });
    }

    public get(getArgs: QuoteGetAttributes): Promise<Quote> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        });
    }

    public del(destroyArgs: QuoteDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs);
    }

    public destroy(destroyArgs: QuoteDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            data: destroyArgs,
            url: `${this.basePath}/{term}`
        });
    }
}
