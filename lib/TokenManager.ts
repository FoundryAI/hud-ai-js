import * as Promise from 'bluebird';
import * as moment from 'moment';
import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import {HudAiRequestAttributes, RequestManager} from './RequestManager';
import * as _ from 'lodash';

export interface TokenInfo {
    accessToken: string;
    accessTokenAcquiredAtMS: number;
    accessTokenTTLMS: number;
    refreshToken?: string;
}

export interface GrantResponseBody {
    access_token: string;
    refresh_token?: string;
    expires_at: number;
}

export interface TokenManagerRequestData {
    grant_type: 'client_credentials' | 'refresh_grant' | 'password';
    refresh_token?: string;
    username?: string;
    password?: string;
}

export function getTokensFromGrantResponse(responseBody: GrantResponseBody) {
    return {
        accessToken: responseBody.access_token,
        refreshToken: responseBody.refresh_token,
        accessTokenAcquiredAtMS: +moment(),
        accessTokenTTLMS: responseBody.expires_at
    }
}

export class TokenManager {
    public config: HudAiClientConfiguration;
    public requestManager: RequestManager;

    constructor(config: HudAiClientConfiguration, requestManager: RequestManager) {
        this.config = config;
        this.requestManager = requestManager;
    }

    public getTokensPasswordGrant(username: string, password: string) {
        return this.getTokens({
            username,
            password,
            grant_type: 'password',
        })
    }

    public getTokensClientCredentialsGrant() {
        return this.getTokens({
            grant_type: 'client_credentials'
        })
    }

    public getTokensRefreshGrant(refreshToken: string) {
        return this.getTokens({
            grant_type: 'refresh_grant',
            refresh_token: refreshToken
        })
    }

    private getTokens(data: TokenManagerRequestData) {
        return Promise.resolve()
        .then(() => {

            return this.requestManager.makeRequest(<HudAiRequestAttributes>{
                method: 'POST',
                data: _.defaults(data, {
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret
                }),
                url: '/oauth/token'
            })
        })
        .then((result) => getTokensFromGrantResponse(result))
    }

    public static isAccessTokenValid(tokenInfo: TokenInfo) {
        const expiresAt = moment(tokenInfo.accessTokenAcquiredAtMS).add(tokenInfo.accessTokenTTLMS, 'ms');
        return moment().isAfter(expiresAt);
    }
}