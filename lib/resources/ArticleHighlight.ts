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

    public get(id: string | number): Promise<ArticleHighlight> {
        return this._get(id);
    }

    public list(listArgs: ArticleHighlightListAttributes): Promise<ArticleHighlight[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: ArticleHighlightUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: ArticleHighlightCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this._del(id);
    }
}
