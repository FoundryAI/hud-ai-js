import {Factory, HudAiClientConfiguration} from './util/ClientConfigFactory';
import {RequestManager} from './RequestManager';
import {TokenInfo, TokenManager} from './TokenManager';
import * as _ from 'lodash';
import {PersistentSession} from './sessions/PersistentSession';
import {HudAiClient} from './HudAiClient';

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
        this.config = Factory(config);
        this.requestManager = new RequestManager(this.config);
        this.tokenManager = new TokenManager(this.config, this.requestManager);
    }

    configure (config: HudAiClientConfiguration) {
        this.config = _.assignIn(this.config, config);
    }

    createClient (tokenStore?: TokenStore) {
        return Promise.resolve(this.tokenManager.getTokensClientCredentialsGrant())
        .then((tokenInfo: TokenInfo) => {
            const session = new PersistentSession(this.config, tokenInfo, this.tokenManager, tokenStore);
            return new HudAiClient(this.config, session, this.requestManager);
        })
    }

    getTokensRefreshGrant (refreshToken) {
        return this.tokenManager.getTokensRefreshGrant(refreshToken);
    }
}