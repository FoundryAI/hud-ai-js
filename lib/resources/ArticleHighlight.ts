import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface ArticleHighlight {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    articleId: string;
    body: string;
    userId: string;
}

export interface ArticleHighlightListAttributes extends HudAiListAttributes {
    articleId?: string;
    linkHash?: string;
    userId?: string;
}

export interface ArticleHighlightCreateAttributes extends HudAiCreateAttributes {
    article_id: string;
    body: string;
    user_id: string;
}

export interface ArticleHighlightUpdateAttributes extends HudAiUpdateAttributes {
    articleId?: string;
    body?: string;
    userId?: string;
}

export class ArticleHighlightResource extends Resource<
    ArticleHighlight,
    ArticleHighlightListAttributes,
    ArticleHighlightCreateAttributes,
    ArticleHighlightUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/article-highlights', requestManager);
    }

    public list(listArgs: ArticleHighlightListAttributes): Promise<{ count: number, rows: ArticleHighlight[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: ArticleHighlightCreateAttributes): Promise<ArticleHighlight> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<ArticleHighlight> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: ArticleHighlightUpdateAttributes): Promise<ArticleHighlight> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
