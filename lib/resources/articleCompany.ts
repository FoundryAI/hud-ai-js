import * as Promise from 'bluebird';
import * as _ from 'lodash';
import {HudAiCreateAttributes, HudAiListAttributes, Resource} from "../resource";

export interface HudAiArticleCompany {
    article_uuid: string;
    company_id: number;
    article_type: string;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
}

export interface HudAiArticleCompanyListAttributes extends HudAiListAttributes {
    company_id: number;
    article_type: string;
    published_at: Date;
}

export interface HudAiArticleCompanyCreateAttributes extends HudAiCreateAttributes {
    company_id: number;
    article_type: string;
    published_at: Date;
}

/**
 * @class ArticleCompanyResource
 * @extends Resource
 */
export class ArticleCompanyResource extends Resource {

    /**
     * @param secretKey {string}
     */
    constructor (secretKey: string) {
        super(secretKey);
        this.resourceName = 'ArticleCompany';
    }

    /**
     * @param article_uuid {string}
     * @returns {Promise<HudAiArticleCompany>}
     */
    get (article_uuid: string) {
        return this.makeRequest({
            method: 'GET',
            params: { article_uuid },
            url: '/article-companies/internal/{article_uuid}'
        })
    }

    /**
     * @param params {HudAiArticleCompanyListAttributes}
     * @returns {Promise<{Items: HudAiArticleCompany[], Count: number}>}
     */
    list (params: HudAiArticleCompanyListAttributes) {
        return this.makeRequest({
            method: 'GET',
            query: _.pick(params, ['limit', 'offset', 'url']),
            url: '/article-companies/internal'
        })
    }

    /**
     * @param params {HudAiArticleCompanyCreateAttributes}
     * @returns {Promise<HudAiArticleCompany>}
     */
    create (params: HudAiArticleCompanyCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: _.pick(params, ['url', 'maxUrls', 'maxAge']),
            url: '/article-companies/internal'
        })
    }

}