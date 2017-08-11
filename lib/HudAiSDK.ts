import {HudAiClientConfiguration} from './util/ClientConfigFactory';

export interface TokenStore {
    read: Function;
    write: Function;
    clear: Function;
}

export class HudAiSDK {
    constructor(config: HudAiClientConfiguration) {

    }

    getAnonymousClient () {

    }

    getBasicClient () {

    }

    getPersistentClient (tokenInfo, tokenStore?: TokenStore) {

    }

    getTokensRefreshGrant (refreshToken, options) {

    }
}