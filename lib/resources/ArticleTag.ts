import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface ArticleTag {
    id: string;
    articleId: string;
    tag: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ArticleTagGetAttributes {
    articleId: string;
    tag: string;
}

export interface ArticleTagListAttributes extends HudAiListAttributes {
    articleId: string;
    tag?: string;
}

export interface ArticleTagCreateAttributes extends HudAiCreateAttributes {
    articleId: string;
    tag: string;
}

export interface ArticleTagDestroyAttributes {
    articleId: string;
    tag: string;
}

export class ArticleTagResource extends Resource<
    ArticleTag,
    ArticleTagListAttributes,
    ArticleTagCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/articles/{articleId}/tags', requestManager);
    }

    public get(getArgs: ArticleTagGetAttributes): Promise<ArticleTag> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{tag}`
        })
    }

    public list(listArgs: ArticleTagListAttributes): Promise<ArticleTag[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: ArticleTagCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: ArticleTagDestroyAttributes) {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: ArticleTagDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{tag}`
        })
    }
}
