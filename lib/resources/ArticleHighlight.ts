import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import {Session} from '../Session';
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

export class ArticleHighlightResource extends Resource {

    constructor(apiSession: Session, requestManager: RequestManager) {
        super('/article-highlights', apiSession, requestManager);
    }

    public get(id: string) {
        return super.get(id);
    }

    public list(params: ArticleHighlightListAttributes) {
        return super.list(params);
    }

    public create(params: ArticleHighlightCreateAttributes) {
        return super.create(params);
    }

    public update(id: string, params: ArticleHighlightUpdateAttributes) {
        return super.update(id, params);
    }

    public del(id: string) {
        return super.del(id);
    }
}
