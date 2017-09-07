import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import * as Promise from 'bluebird';

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

export class ArticleHighlightResource extends Resource<any, ArticleHighlightListAttributes, ArticleHighlightCreateAttributes, ArticleHighlightUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/article-highlights', requestManager);
    }
}
