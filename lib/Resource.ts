import * as Promise from 'bluebird';
import * as _ from 'lodash'

import {HudAiRequestAttributes, RequestManager} from './RequestManager';
import {Session} from './Session';


export interface HudAiListAttributes {
    limit: number;
    offset: number;
}

export interface  HudAiCreateAttributes {

}

export interface HudAiUpdateAttributes {

}

export abstract class Resource<T, L extends HudAiListAttributes, C extends HudAiCreateAttributes, U extends HudAiUpdateAttributes> {

    protected basePath: string;
    public apiSession: Session;
    protected requestManager: RequestManager;

    constructor(basePath: string, apiSession: Session, requestManager: RequestManager) {
        this.basePath = basePath;
        this.apiSession = apiSession;
        this.requestManager = requestManager;
    }

    public makeRequest(options: HudAiRequestAttributes) {
        return Promise.resolve(this.apiSession.getAccessToken())
        .then(accessToken => {
            const requestArgs = _.defaultsDeep(options, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return this.requestManager.makeRequest(<HudAiRequestAttributes>requestArgs);
        })
        .catch(err => {
            if (err.statusCode === 401) return this.apiSession.handleExpiredToken(err);
            throw err;
        })
    }

    public get(id: string|number) : Promise<T> {
        return this.makeRequest({
            method: 'GET',
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

    public list(params: L) : Promise<T[]> {
        return this.makeRequest({
            method: 'GET',
            params: params,
            url: `${this.basePath}`
        })
    }

    public update(id: string|number, params: U) {
        return this.makeRequest({
            method: 'PUT',
            data: params,
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

    public create(params: C) {
        return this.makeRequest({
            method: 'POST',
            data: params,
            url: `${this.basePath}`
        })
    }

    public del(id: string|number) {
        return this.makeRequest({
            method: 'DELETE',
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

}
