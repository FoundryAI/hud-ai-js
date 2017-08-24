import * as Promise from 'bluebird';
import {TokenInfo, TokenManager} from '../TokenManager';
import {HudAiClientConfiguration} from '../util/ClientConfigFactory';

export class PersistentSession {
    public tokenInfo: TokenInfo;
    public tokenManager: TokenManager;
    private config: HudAiClientConfiguration;

    constructor (config: HudAiClientConfiguration, tokenManager: TokenManager) {
        this.tokenManager = tokenManager;
        this.config = config;
        this.tokenInfo = {
            accessToken: <string>'',
            accessTokenAcquiredAtMS: <number>0,
            accessTokenTTLMS: <number>0
        };
    }

    public getAccessToken () {
        if (!TokenManager.isAccessTokenValid(this.tokenInfo)) {
            return this.refreshTokens();
        } else {
            return Promise.resolve(this.tokenInfo.accessToken);
        }
    }

    public refreshTokens () {
        return this.tokenManager.getTokensRefreshGrant(<string>this.tokenInfo.refreshToken)
        .then((tokenInfo: TokenInfo) => {
            return this.handleTokenRefresh(tokenInfo);
        })
        .catch(err => {
            return this.handleExpiredToken(err);
        });
    }

    public handleExpiredToken (err: Error) {
        this.tokenInfo = {
            accessToken: <string>'',
            accessTokenAcquiredAtMS: <number>0,
            accessTokenTTLMS: <number>0
        };
        return Promise.reject(err);
    }

    private handleTokenRefresh (tokenInfo: TokenInfo) {
        this.tokenInfo = tokenInfo;
        return this.tokenInfo.accessToken;
    }



}