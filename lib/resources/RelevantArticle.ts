import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { RelevantArticle } from '../entities';

export interface RelevantArticleListAttributes extends HudAiListAttributes {
    userId?: string;
    articleId?: string;
    publishedBefore?: Date;
    publishedAfter?: Date;
    scoredAbove?: number;
    scoredBelow?: number;
    scoredBefore?: Date;
    scoredAfter?: Date;
    keyTerms?: string[];
    tags?: string[];
    include?: string[];
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
    flag?: string;
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

    public list(listArgs: RelevantArticleListAttributes): Promise<{ count: number, rows: RelevantArticle[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: RelevantArticleCreateAttributes): Promise<RelevantArticle> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<RelevantArticle> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: RelevantArticleUpdateAttributes): Promise<RelevantArticle> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
