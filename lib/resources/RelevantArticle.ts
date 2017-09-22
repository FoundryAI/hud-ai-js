import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface RelevantArticle {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    articleId: string;
    articlePublishedAt: Date;
    score: number;
    scoredAt: Date;
    userId: string;
}

export interface RelevantArticleListAttributes extends HudAiListAttributes {
    userId?: string;
    articleId?: string;
    publishedBefore?: Date;
    publishedAfter?: Date;
    scoredAbove?: number;
    scoredBelow?: number;
    scoredBefore?: Date;
    scoredAfter?: Date;
}

export interface RelevantArticleCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    articleId: string;
    score: number;
    scoredAt: Date;
    articlePublishedAt?: Date;
}

export interface RelevantArticleUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    articleId?: string;
    score?: number;
    scoredAt?: Date;
    articlePublishedAt?: Date;
}

export class RelevantArticleResource extends Resource<
    RelevantArticle,
    RelevantArticleListAttributes,
    RelevantArticleCreateAttributes,
    RelevantArticleUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/articles/relevant', requestManager);
    }

    public get(id: string | number): Promise<RelevantArticle> {
        return this._get(id);
    }

    public list(listArgs: RelevantArticleListAttributes): Promise<RelevantArticle[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: RelevantArticleUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: RelevantArticleCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this.destroy(id);
    }

    public destroy(id: string | number) {
        return this._destroy(id);
    }
}
