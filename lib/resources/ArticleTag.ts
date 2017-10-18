import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface BasicArticleTag {
    tag: string;
}

export interface ArticleTag extends BasicArticleTag {
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

    public list(listArgs: ArticleTagListAttributes): Promise<{ count: number, rows: ArticleTag[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: ArticleTagCreateAttributes): Promise<ArticleTag> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: ArticleTagGetAttributes): Promise<ArticleTag> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{tag}`
        })
    }

    public del(destroyArgs: ArticleTagDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: ArticleTagDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{tag}`
        })
    }
}
