import * as Promise from 'bluebird';
import { pick, omit } from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { ArticleGeography } from '../entities';

export interface ArticleGeographyGetAttributes {
    articleId: string;
    geography: string;
}

export interface ArticleGeographyListAttributes extends HudAiListAttributes {
    articleId: string;
    geography?: string;
}

export interface ArticleGeographyCreateAttributes extends HudAiCreateAttributes {
    articleId: string;
    geography: string;
}

export interface ArticleGeographyDestroyAttributes {
    articleId: string;
    geography: string;
}

export class ArticleGeographyResource extends Resource<
    ArticleGeography,
    ArticleGeographyListAttributes,
    ArticleGeographyCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/articles/{articleId}/geographies', requestManager);
    }

    public list(listArgs: ArticleGeographyListAttributes): Promise<{ count: number, rows: ArticleGeography[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: ArticleGeographyCreateAttributes): Promise<ArticleGeography> {
        return this.makeRequest({
            method: 'POST',
            params: pick(createArgs, 'articleId'),
            data: omit(createArgs, 'articleId'),
            url: `${this.basePath}`
        })
    }

    public get(getArgs: ArticleGeographyGetAttributes): Promise<ArticleGeography> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{geography}`
        })
    }

    public del(destroyArgs: ArticleGeographyDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: ArticleGeographyDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{geography}`
        })
    }
}
