import * as _ from 'lodash';

import * as Promise from 'bluebird';
import * as isAfter from 'date-fns/is_after';
import * as addMilliseconds from 'date-fns/add_milliseconds';

import { TokenRequestData } from './utils/TokenExchange';

import { Factory as ClientConfigFactory } from './utils/ClientConfigFactory';
import { RequestManager } from './RequestManager';
import { HudAiError } from './utils/HudAiError';

import {
    ArticleResource,
    ArticleHighlightResource,
    ArticleKeyTermResource,
    ArticleTagResource,
    CollateralResource,
    CompanyResource,
    CompanyKeyTermResource,
    CompanyProfileResource,
    DomainResource,
    KeyTermResource,
    OrganizationResource,
    PersonResource,
    PersonKeyTermResource,
    QuoteResource,
    RelevantArticleResource,
    RelevantArticleCollateralResource,
    TextCorpusResource,
    UserResource,
    UserCompanyResource,
    UserContactResource,
    UserDigestSubscriptionResource,
    UserKeyTermResource,
} from './resources';
import {CompanyProfile} from './resources/CompanyProfile';

export {
    Article,
    ArticleHighlight,
    ArticleKeyTerm,
    ArticleTag,
    Collateral,
    Company,
    CompanyKeyTerm,
    CompanyProfile,
    Domain,
    KeyTerm,
    Organization,
    Person,
    PersonKeyTerm,
    Quote,
    RelevantArticle,
    RelevantArticleCollateral,
    TextCorpus,
    User,
    UserCompany,
    UserContact,
    UserDigestSubscription,
    UserKeyTerm,
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
    public articleKeyTerms: ArticleKeyTermResource;
    public articleTags: ArticleTagResource;
    public collateral: CollateralResource;
    public companies: CompanyResource;
    public companyKeyTerms: CompanyKeyTermResource;
    public companyProfiles: CompanyProfileResource;
    public domains: DomainResource;
    public keyTerms: KeyTermResource;
    public organizations: OrganizationResource;
    public people: PersonResource;
    public peopleKeyTerms: PersonKeyTermResource;
    public quotes: QuoteResource;
    public relevantArticles: RelevantArticleResource;
    public relevantArticleCollateral: RelevantArticleCollateralResource;
    public textCorpora: TextCorpusResource;
    public users: UserResource;
    public userCompanies: UserCompanyResource;
    public userContacts: UserContactResource;
    public userDigestSubscriptions: UserDigestSubscriptionResource;
    public userKeyTerms: UserKeyTermResource;

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
        const config = ClientConfigFactory(clientConfig);
        return new HudAiClient(config);
    }

    constructor(config: HudAiClientConfiguration) {
        this.baseApiUrl = config.baseApiUrl || 'https://api.hud.ai/v1';
        this.baseAuthUrl = config.baseAuthUrl || 'https://accounts.hud.ai';
        if (config.redirectUri) this.redirectUri = config.redirectUri;

        this.clientId = config.clientId;
        if (config.clientSecret) this.clientSecret = config.clientSecret;

        this.requestManager = new RequestManager(this, config);

        this.articles = new ArticleResource(this.requestManager);
        this.articleHighlights = new ArticleHighlightResource(this.requestManager);
        this.articleKeyTerms = new ArticleKeyTermResource(this.requestManager);
        this.articleTags = new ArticleTagResource(this.requestManager);
        this.collateral = new CollateralResource(this.requestManager);
        this.companies = new CompanyResource(this.requestManager);
        this.companyKeyTerms = new CompanyKeyTermResource(this.requestManager);
        this.companyProfiles = new CompanyProfileResource(this.requestManager);

        this.domains = new DomainResource(this.requestManager);
        this.keyTerms = new KeyTermResource(this.requestManager);
        this.organizations = new OrganizationResource(this.requestManager);
        this.people = new PersonResource(this.requestManager);
        this.peopleKeyTerms = new PersonKeyTermResource(this.requestManager);
        this.quotes = new QuoteResource(this.requestManager);
        this.relevantArticles = new RelevantArticleResource(this.requestManager);
        this.relevantArticleCollateral = new RelevantArticleCollateralResource(this.requestManager);
        this.textCorpora = new TextCorpusResource(this.requestManager);
        this.users = new UserResource(this.requestManager);
        this.userCompanies = new UserCompanyResource(this.requestManager);
        this.userContacts = new UserContactResource(this.requestManager);
        this.userDigestSubscriptions = new UserDigestSubscriptionResource(this.requestManager);
        this.userKeyTerms = new UserKeyTermResource(this.requestManager);

        this.addDeprecatedAttributes();
    }

    // Defaults to the more secure 'code' option
    public getAuthorizeUri(responseType: string = 'code'): string {
        if (!this.redirectUri) throw new HudAiError('cannot generate authorization URL without redirectUri');

        const params = _.map({
            response_type: responseType,
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
        }, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&');

        return `${this.baseAuthUrl}/oauth2/authorize?${params}`
    }

    public getLogoutUri(): string {
        if (!this.redirectUri) throw new HudAiError('cannot generate logout URL without redirectUri');

        return `${this.baseAuthUrl}/logout/?redirectTo=${this.redirectUri}`
    }

    public refreshTokens(): Promise<void> {
        if (this.tokenExpiresAt && isAfter(this.tokenExpiresAt, new Date()))
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
                this.tokenExpiresAt = addMilliseconds(new Date(), response.expires_in);
            });
    }

    private handleTokenRefresh(): Promise<void> {
            return this.getTokens({
            grant_type: 'refresh_grant',
            refresh_token: this.refreshToken
        })
    }
}
