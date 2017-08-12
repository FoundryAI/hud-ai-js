import * as Request from 'request-promise';
import * as _ from 'lodash'

import { HudAiError } from './util/HudAiError';
import {HudAiRequestAttributes, RequestManager} from './RequestManager';
import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import {BasicSession} from './sessions/BasicSession';
import {PersistentSession} from './sessions/PersistentSession';
import * as _ from 'lodash';


export interface HudAiListAttributes {
    limit: number;
    offset: number;
}

export interface  HudAiCreateAttributes {

}

export interface HudAiUpdateAttributes {

}

export abstract class Resource {

    protected basePath: string;
    public apiSession: BasicSession|PersistentSession;
    protected requestManager: RequestManager;

    constructor(basePath: string, apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        this.basePath = basePath;
        this.apiSession = apiSession;
        this.requestManager = requestManager;
    }

    public makeRequest(options: HudAiRequestAttributes) {
        return this.apiSession.getAccessToken()
        .then(accessToken => {
            const requestArgs = _.defaultsDeep(options, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return this.requestManager.makeRequest(requestArgs);
        })
        .catch(err => {
            if (err.statusCode === 401) return this.apiSession.handleExpiredToken(err);
            throw err;
        })
    }

    public get(id: string|number) {
        return this.requestManager.makeRequest({
            method: 'GET',
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

    public list(params: HudAiListAttributes) {
        return this.requestManager.makeRequest({
            method: 'GET',
            query: params,
            url: `${this.basePath}`
        })
    }

    public update(id: string|number, params: HudAiUpdateAttributes) {
        return this.requestManager.makeRequest({
            method: 'PUT',
            data: params,
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

    public create(params: HudAiCreateAttributes) {
        return this.requestManager.makeRequest({
            method: 'POST',
            data: params,
            url: `${this.basePath}`
        })
    }

    public del(id: string|number) {
        return this.requestManager.makeRequest({
            method: 'DELETE',
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

}