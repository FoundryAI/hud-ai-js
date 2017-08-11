import * as Request from 'request-promise';
import * as _ from 'lodash'

import { HudAiError } from './HudAiError';


export interface HudAiListAttributes {
    limit: number;
    offset: number;
}

export interface  HudAiCreateAttributes {

}

export interface HudAiUpdateAttributes {

}

export interface HudAiDeleteAttributes {
    id: number | string;
}

export abstract class Resource {

    protected resourceName: string;
    protected secretKey: string;
    protected baseUrl: string;

    constructor(secretKey: string, baseUrl: string = 'https://api.hud.ai') {

        this.secretKey = secretKey;
        this.baseUrl = baseUrl;

        if (!this.secretKey) {
            throw new HudAiError('Missing required parameter "secretKey".', 'authentication_error');
        }

    }

    /**
     * @param requestConfig
     * @returns {Promise<>}
     */
    public makeRequest(requestConfig: HudAiRequestAttributes) {
        return Request({
            baseUrl: this.baseUrl,
            body: requestConfig.data || {},
            headers: this.buildHeaders(),
            method: requestConfig.method,
            qs: requestConfig.query || {},
            timeout: 60000,
            uri: this.buildUrl(requestConfig),
            json: true
        })
            .catch(err => {
                throw new HudAiError(err.message, err.type);
            })
    }

    private buildHeaders() {
        return {
            "User-Agent": `Hud.ai node v1.0.0 +(https://github.com/FoundryAI/hud-ai-node#readme)`
        }
    }

    private buildUrl(requestConfig) {
        let url = requestConfig.url;
        _.mapKeys(requestConfig.params, (value, key) => {
            url = url.replace(`{${key}}`, value)
        });
        return url;
    }
}