import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { Quote } from '../entities';

export interface QuoteListAttributes extends HudAiListAttributes {
    personId?: string;
    articleId?: string;
    term?: string;
    minImportance?: number;
}

export interface QuoteSearchAttributes extends HudAiListAttributes {
    id?: string;
    personId?: string;
    articleId?: string;
    term?: string;
    text?: string;
    minImportance?: number,
    maxImportance?: number,
    createdBefore?: Date;
    createdAfter?: Date;
}

export interface QuoteCreateAttributes extends HudAiCreateAttributes {
    personId: string;
    articleId: string;
    text: string;
    term: string;
    importanceScore?: number;
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
        return this._list(listArgs);
    }

    public search(searchArgs: QuoteSearchAttributes): Promise<{ count: number, rows: Quote[] }> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search`
        });
    }

    public create(createArgs: QuoteCreateAttributes): Promise<Quote> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Quote> {
        return this._get(id);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
