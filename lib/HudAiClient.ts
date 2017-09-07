import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as moment from 'moment';

import { TokenRequestData } from './util/TokenExchange';

import { Factory } from './util/ClientConfigFactory';
import { RequestManager } from './RequestManager';
import { HudAiError } from './util/HudAiError';

import {
    ArticleResource,
    ArticleHighlightResource,
    CompanyResource,
    DomainResource,
    KeyTermResource,
    TextCorpusResource,
    UserResource,
} from './resources';


export interface HudAiClientConfiguration {
    clientId: string;
    clientSecret?: string;
    redirectUri?: string;
    baseApiUrl?: string;
    baseAuthUrl?: string;
    request?: object;
}

export class HudAiClient {
    public baseApiUrl: string;
    public accessToken?: string;
    public refreshToken?: string;
    public tokenExpiresAt?: Date;

    public article: ArticleResource;
    public articleHighlight: ArticleHighlightResource;
    public company: CompanyResource;
    public domain: DomainResource;
    public keyTerm: KeyTermResource;
    public textCorpus: TextCorpusResource;
    public user: UserResource;

    private authorizationCode?: string;
    private baseAuthUrl: string;
    private clientId: string;
    private clientSecret?: string;
    private redirectUri?: string;

    private requestManager: RequestManager;

    public static create (clientConfig: HudAiClientConfiguration) {
        const config = Factory(clientConfig);
        return new HudAiClient(config);
    }

    constructor(config: HudAiClientConfiguration) {
        this.baseApiUrl = config.baseApiUrl || 'https://api.hud.ai/v1';
        this.baseAuthUrl = config.baseAuthUrl || 'https://auth.hud.ai';
        if (config.redirectUri) this.redirectUri = config.redirectUri;

        this.clientId = config.clientId;
        if (config.clientSecret) this.clientSecret = config.clientSecret;

        this.requestManager = new RequestManager(this, config);

        this.article = new ArticleResource(this.requestManager);
        this.articleHighlight = new ArticleHighlightResource(this.requestManager);
        this.company = new CompanyResource(this.requestManager);
        this.domain = new DomainResource(this.requestManager);
        this.keyTerm = new KeyTermResource(this.requestManager);
        this.textCorpus = new TextCorpusResource(this.requestManager);
        this.user = new UserResource(this.requestManager);
    }

    // Defaults to the more secure 'code' option
    public getAuthorizeUri(responseType: string = 'code'): string {
        if (!this.redirectUri) throw new HudAiError('cannot generate authorization URL without redirectUri');

        const params = _.chain({
                response_type: responseType,
                client_id: this.clientId,
                redirect_uri: this.redirectUri,
            })
            .map((value, key) => `${key}=${value}`)
            .join('&')
            .value();

        return `${this.baseAuthUrl}/oauth2/authorize?${params}`
    }

    public refreshTokens(): Promise {
        if (moment(this.tokenExpiresAt).isAfter(moment.now()))
            return Promise.resolve(null);

        if (this.authorizationCode) return this.exchangeAuthCode();

        if (this.refreshToken) return this.handleTokenRefresh();

        if (this.clientSecret) return this.exchangeClientCredentials();
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public setAuthorizationCode(authorizationCode: string) {
        this.authorizationCode = authorizationCode;
    }

    // Private

    private exchangeAuthCode(): Promise {
        return this.getTokens({
            grant_type: 'authorization_code',
            code: this.authorizationCode
        })
            .then(() => { delete this.authorizationCode; })
    }

    private exchangeClientCredentials(): Promise {
        return this.getTokens({
            grant_type: 'client_credentials'
        })
    }

    private getTokens(data: TokenRequestData): Promise {
        return this.requestManager.makeRequest(
            { method: 'POST', data, url: `${this.baseAuthUrl}/oauth2/token` },
            { refreshTokens: false }
        )
            .then((response) => {
                this.accessToken = response.access_token;
                if (response.refresh_token) this.refreshToken = response.refresh_token;
                this.tokenExpiresAt = moment().add(response.expires_in, 'ms').toDate();
            });
    }

    private handleTokenRefresh(): Promise {
        return this.getTokens({
            grant_type: 'refresh_grant',
            refresh_token: this.refreshToken
        })
    }
}
