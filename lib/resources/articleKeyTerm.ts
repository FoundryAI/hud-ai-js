import * as Promise from 'bluebird';
import * as _ from 'lodash';
import {HudAiCreateAttributes, HudAiListAttributes, Resource} from "../resource";

export interface HudAiArticleKeyTerm {
    term: string;
    article_id: string;
    published_before: Date;
    published_after: Date;
    published_at: Date;
}

export interface HudAiArticleKeyTermListAttributes extends HudAiListAttributes {
    term: string;
    published_before: Date;
    published_after: Date;
}

export interface HudAiArticleKeyTermCreateAttributes extends HudAiCreateAttributes {
    term: string;
    article_id: string;
    published_at: Date;
}

/**
 * @class ArticleKeyTermResource
 * @extends Resource
 */
export class ArticleKeyTermResource extends Resource {

    /**
     * @param secretKey {string}
     */
    constructor(secretKey: string) {
        super(secretKey);
        this.resourceName = 'ArticleKeyTerm';
    }

    /**
     * @param params {HudAiArticleKeyTermListAttributes}
     * @returns {Promise<{Items: HudAiArticleKeyTerm[], Count: number}>}
     */
    list(params: HudAiArticleKeyTermListAttributes) {
        return this.makeRequest({
            method: 'GET',
            query: _.pick(params, ['term', 'published_before', 'published_after']),
            url: '/article-key-terms/internal'
        })
    }

    /**
     * @param params {HudAiArticleKeyTermCreateAttributes}
     * @returns {Promise<HudAiArticleKeyTerm>}
     */
    create(params: HudAiArticleKeyTermCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: _.pick(params, ['article_id', 'term', 'published_at']),
            url: '/article-key-terms/internal'
        })
    }

    /**
     * @param article_id {string}
     * @param term {string}
     * @returns {Promise<>}
     */
    delete(article_id: string, term: string) {
        return this.makeRequest({
            method: 'DELETE',
            params: {article_id, term},
            url: '/article-key-terms/internal/{article_id}/{term}'
        })
    }

}