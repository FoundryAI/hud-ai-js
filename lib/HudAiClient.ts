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

    public articles: ArticleResource;
    public articleHighlights: ArticleHighlightResource;
    public companies: CompanyResource;
    public domains: DomainResource;
    public keyTerms: KeyTermResource;
    public textCorpora: TextCorpusResource;
    public users: UserResource;

    // Deprecated
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

        this.articles = new ArticleResource(this.requestManager);
        this.articleHighlights = new ArticleHighlightResource(this.requestManager);
        this.companies = new CompanyResource(this.requestManager);
        this.domains = new DomainResource(this.requestManager);
        this.keyTerms = new KeyTermResource(this.requestManager);
        this.textCorpora = new TextCorpusResource(this.requestManager);
        this.users = new UserResource(this.requestManager);

        this.addDeprecatedAttributes();
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

    public refreshTokens(): Promise<void> {
        if (moment(this.tokenExpiresAt).isAfter(moment.now()))
            return Promise.resolve();

        if (this.authorizationCode) return this.exchangeAuthCode();

        if (this.refreshToken) return this.handleTokenRefresh();

        if (this.clientSecret) return this.exchangeClientCredentials();

        return Promise.resolve();
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public setAuthorizationCode(authorizationCode: string) {
        this.authorizationCode = authorizationCode;
    }

    // Private

    private addDeprecatedAttributes(): Promise<void> {
        this.article = this.articles;
        this.articleHighlight = this.articleHighlights;
        this.company = this.companies;
        this.domain = this.domains;
        this.keyTerm = this.keyTerms;
        this.textCorpus = this.textCorpora;
        this.user = this.users;
    }

    private exchangeAuthCode(): Promise<void> {
        return this.getTokens({
            grant_type: 'authorization_code',
            code: this.authorizationCode
        })
            .then(() => { delete this.authorizationCode; })
    }

    private exchangeClientCredentials(): Promise<void> {
        return this.getTokens({
            grant_type: 'client_credentials'
        })
    }

    private getTokens(data: TokenRequestData): Promise<void> {
        const payload = _.merge({
            client_id: this.clientId,
            client_secret: this.clientSecret,
        }, data);

        return this.requestManager.makeRequest({
                method: 'POST',
                data: payload,
                url: `${this.baseAuthUrl}/oauth2/token`
            }, { refreshTokens: false })
            .then((response) => {
                this.accessToken = response.access_token;
                if (response.refresh_token) this.refreshToken = response.refresh_token;
                this.tokenExpiresAt = moment().add(response.expires_in, 'ms').toDate();
            });
    }

    private handleTokenRefresh(): Promise<void> {
            return this.getTokens({
            grant_type: 'refresh_grant',
            refresh_token: this.refreshToken
        })
    }
}
