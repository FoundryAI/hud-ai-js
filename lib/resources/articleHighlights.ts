import * as Promise from 'bluebird';
import * as _ from 'lodash';
import {HudAiCreateAttributes, HudAiListAttributes, Resource} from "../resource";

export interface HudAiArticleHighlights {
    url_hash: string;
    user_id: number;
    body: string;
    created_at: Date;
    updated_at: Date;
}

export interface HudAiArticleHighlightsListAttributes extends HudAiListAttributes {
    body: string;
    user_id: number;
    url_hash: string;
}

export interface HudAiArticleHighlightsCreateAttributes extends HudAiCreateAttributes {
    body: string;
    user_id: number;
    url_hash: string;
}

export interface HudAiArticleHighlightsUpdateAttributes extends HudAiCreateAttributes {
    body: string;
}

/**
 * @class ArticleHighlightsResource
 * @extends Resource
 */
export class ArticleHighlightsResource extends Resource {

    /**
     * @param secretKey {string}
     */
    constructor(secretKey: string) {
        super(secretKey);
        this.resourceName = 'ArticleHighlights';
    }

    /**
     * @param url_hash {string}
     * @returns {Promise<HudAiArticleHighlights>}
     */
    get(url_hash: string) {
        return this.makeRequest({
            method: 'GET',
            params: {url_hash},
            url: '/article-highlights/internal/{url_hash}'
        })
    }

    /**
     * @param params {HudAiArticleHighlightsListAttributes}
     * @returns {Promise<{Items: HudAiArticleHighlights[], Count: number}>}
     */
    list(params: HudAiArticleHighlightsListAttributes) {
        return this.makeRequest({
            method: 'GET',
            query: _.pick(params, ['body', 'user_id', 'url_hash']),
            url: '/article-highlights/internal'
        })
    }

    /**
     * @param params {HudAiArticleHighlightsCreateAttributes}
     * @returns {Promise<HudAiArticleHighlights>}
     */
    create(params: HudAiArticleHighlightsCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: _.pick(params, ['url_hash', 'user_id', 'body']),
            url: '/article-highlights/internal'
        })
    }

    /**
     * @param params {HudAiArticleHighlightsUpdateAttributes}
     * @returns {Promise<HudAiArticleHighlights>}
     */
    update(params: HudAiArticleHighlightsUpdateAttributes) {
        return this.makeRequest({
            method: 'PUT',
            params: _.pick(params, ['url_hash']),
            data: _.pick(params, ['body']),
            url: '/article-highlights/internal/{url_hash}'
        })
    }

    /**
     * @param url_hash {string}
     * @returns {Promise<>}
     */
    delete(url_hash: string) {
        return this.makeRequest({
            method: 'DELETE',
            params: {url_hash},
            url: '/article-highlights/internal/{url_hash}'
        })
    }

}