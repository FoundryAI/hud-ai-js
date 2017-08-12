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

export interface HudAiDeleteAttributes {
    id: number | string;
}

export abstract class Resource {

    protected config: HudAiClientConfiguration;
    public apiSession: BasicSession|PersistentSession;
    protected requestManager: RequestManager;

    constructor(config: HudAiClientConfiguration, apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        this.config = config;
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

}