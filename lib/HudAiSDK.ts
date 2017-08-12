import {Factory, HudAiClientConfiguration} from './util/ClientConfigFactory';
import {RequestManager} from './RequestManager';
import {TokenManager} from './TokenManager';
import * as _ from 'lodash';
import {BasicSession} from './sessions/BasicSession';
import {PersistentSession} from './sessions/PersistentSession';

export interface TokenStore {
    read: Function;
    write: Function;
    clear: Function;
}

export class HudAiSDK {
    public config: HudAiClientConfiguration;
    public requestManager: RequestManager;
    public tokenManager: TokenManager;

    constructor(config: HudAiClientConfiguration) {
        this.config = Factory(config)
    }

    configure (config: HudAiClientConfiguration) {
        this.config = _.assignIn(this.config, config);
    }

    getBasicClient (accessToken: string) {
        const session = new BasicSession(accessToken, this.tokenManager);

    }

    getPersistentClient (tokenInfo, tokenStore?: TokenStore) {
        const session = new PersistentSession(this.config, tokenInfo, tokenStore, this.tokenManager);
    }

    getTokensRefreshGrant (refreshToken) {
        return this.tokenManager.getTokensRefreshGrant(refreshToken);
    }
}