import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { ArticleKeyTerm } from '../entities';

export interface ArticleKeyTermGetAttributes {
    articleId: string;
    term: string;
}

export interface ArticleKeyTermListAttributes extends HudAiListAttributes {
    articleId: string;
    term?: string;
}

export interface ArticleKeyTermCreateAttributes extends HudAiCreateAttributes {
    articleId: string;
    term: string;
}

export interface ArticleKeyTermDestroyAttributes {
    articleId: string;
    term: string;
}

export class ArticleKeyTermResource extends Resource<
    ArticleKeyTerm,
    ArticleKeyTermListAttributes,
    ArticleKeyTermCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/articles/{articleId}/key-terms', requestManager);
    }

    public list(listArgs: ArticleKeyTermListAttributes): Promise<{ count: number, rows: ArticleKeyTerm[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: ArticleKeyTermCreateAttributes): Promise<ArticleKeyTerm> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: ArticleKeyTermGetAttributes): Promise<ArticleKeyTerm> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{term}`
        })
    }

    public del(destroyArgs: ArticleKeyTermDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: ArticleKeyTermDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{term}`
        })
    }
}
