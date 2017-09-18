import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface ArticleKeyTerm {
    id: string;
    articleId: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

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

    public get(getArgs: ArticleKeyTermGetAttributes): Promise<ArticleKeyTerm> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{term}`
        })
    }

    public list(listArgs: ArticleKeyTermListAttributes): Promise<ArticleKeyTerm[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: ArticleKeyTermCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: ArticleKeyTermDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{term}`
        })
    }
}
