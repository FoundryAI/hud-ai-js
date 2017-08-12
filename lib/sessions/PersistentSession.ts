import * as Promise from 'bluebird';
import {TokenInfo, TokenManager} from '../TokenManager';
import {TokenStore} from '../HudAiSDK';
import {HudAiClientConfiguration} from '../util/ClientConfigFactory';
import {HudAiError} from '../util/HudAiError';

export class PersistentSession {
    public tokenInfo: TokenInfo;
    public tokenStore?: TokenStore;
    public tokenManager: TokenManager;
    private config: HudAiClientConfiguration;

    constructor (config: HudAiClientConfiguration, tokenInfo: TokenInfo, tokenStore: TokenStore, tokenManager: TokenManager) {
        this.tokenInfo = tokenInfo;
        this.tokenManager = tokenManager;
        this.config = config;
    }

    public getAccessToken () {
        if (!TokenManager.isAccessTokenValid(this.tokenInfo)) {
            return this.refreshTokens();
        } else {
            return Promise.resolve(this.tokenInfo.accessToken);
        }
    }

    public refreshTokens () {
        return this.tokenManager.getTokensRefreshGrant(this.tokenInfo.refreshToken)
        .then((tokenInfo: TokenInfo) => {
            if (this.tokenStore) {
                return this.tokenStore.write(tokenInfo)
                .then(() => this.handleTokenRefresh(tokenInfo))
                .catch(err => this.handleExpiredToken(err));
            }
            return this.handleTokenRefresh(tokenInfo);
        })
        .catch(err => {
            // if we get an error for an invalidated refresh token, check token store as another service api
            // may have recently refreshed the token
            if (err.statusCode === 400 && this.tokenStore) {
                return this.tokenStore.read()
                .then((tokenInfo: TokenInfo) => {
                    if (!tokenInfo || tokenInfo.refreshToken === this.tokenInfo.refreshToken) {
                        return this.handleExpiredToken(new HudAiError('Refresh token has expired or been invalidated'))
                    }
                    return this.handleTokenRefresh(tokenInfo);
                })
                .catch(err => this.handleExpiredToken(err));
            }
            // some other error
            return this.handleExpiredToken(err);
        });
    }

    private handleTokenRefresh (tokenInfo: TokenInfo) {
        this.tokenInfo = tokenInfo;
        return this.tokenInfo.accessToken;
    }

    private handleExpiredToken (err: Error) {
        if (!this.tokenStore) return Promise.reject(err);
        return this.tokenStore.clear()
    }


}