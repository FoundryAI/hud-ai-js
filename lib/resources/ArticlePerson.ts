import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { ArticlePerson } from '../entities';

export interface ArticlePersonListAttributes extends HudAiListAttributes {
    articleId: string;
    personId?: string;
}

export interface ArticlePersonCreateAttributes extends HudAiCreateAttributes {
    articleId: string;
    personId: string;
}

export interface ArticlePersonDestroyAttributes {
    articleId: string;
    personId: string;
}

export class ArticlePersonResource extends Resource<
    ArticlePerson,
    ArticlePersonListAttributes,
    ArticlePersonCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/articles/people', requestManager);
    }

    public list(listArgs: ArticlePersonListAttributes): Promise<{ count: number, rows: ArticlePerson[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public related(personId: string): Promise<{ rows: { personId: string }[] }> {
        return this.makeRequest({
            method: 'GET',
            params: { personId },
            url: `${this.basePath}/{personId}/related`
        })
    }

    public create(createArgs: ArticlePersonCreateAttributes): Promise<ArticlePerson> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: ArticlePersonDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: ArticlePersonDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}`
        })
    }
}
