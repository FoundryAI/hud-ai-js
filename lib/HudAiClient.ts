import * as _ from 'lodash';

import * as Promise from 'bluebird';
import * as isAfter from 'date-fns/is_after';
import * as addMilliseconds from 'date-fns/add_milliseconds';

import { TokenRequestData } from './utils/TokenExchange';

import { Factory as ClientConfigFactory } from './utils/ClientConfigFactory';
import { RequestManager } from './RequestManager';
import { HudAiError } from './utils/HudAiError';

import * as resources from './resources';

export * from './entities';

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

    public actionItems: resources.ActionItemResource;
    public articleCompanies: resources.ArticleCompanyResource;
    public articleKeyTerms: resources.ArticleKeyTermResource;
    public articleTags: resources.ArticleTagResource;
    public articles: resources.ArticleResource;
    public collateral: resources.CollateralResource;
    public companies: resources.CompanyResource;
    public companyEvents: resources.CompanyEventResource;
    public companyIndustries: resources.CompanyIndustryResource;
    public companyKeyTerms: resources.CompanyKeyTermResource;
    public companyProfiles: resources.CompanyProfileResource;
    public domains: resources.DomainResource;
    public feed: resources.FeedResource;
    public highlights: resources.HighlightResource;
    public industries: resources.IndustryResource;
    public jobFunctions: resources.JobFunctionResource;
    public keyTerms: resources.KeyTermResource;
    public organizations: resources.OrganizationResource;
    public people: resources.PersonResource;
    public peopleKeyTerms: resources.PersonKeyTermResource;
    public quotes: resources.QuoteResource;
    public relevantArticleCollateral: resources.RelevantArticleCollateralResource;
    public relevantArticles: resources.RelevantArticleResource;
    public sources: resources.SourceResource;
    public stockAlerts: resources.StockAlertResource;
    public textCorpora: resources.TextCorpusResource;
    public tweets: resources.TweetResource;
    public userCompanies: resources.UserCompanyResource;
    public userCompanyGroups: resources.UserCompanyGroupResource;
    public userContacts: resources.UserContactResource;
    public userDigestSubscriptions: resources.UserDigestSubscriptionResource;
    public userIndustries: resources.UserIndustryResource;
    public userJobFunctions: resources.UserJobFunctionResource;
    public userKeyTerms: resources.UserKeyTermResource;
    public userPeople: resources.UserPersonResource;
    public userSources: resources.UserSourceResource;
    public userTemplates: resources.UserTemplateResource;
    public users: resources.UserResource;
    public videos: resources.VideoResource;
    public videoCompanies: resources.VideoCompanyResource;
    public videoPeople: resources.VideoPersonResource;

    // Deprecated
    public article: resources.ArticleResource;
    public company: resources.CompanyResource;
    public domain: resources.DomainResource;
    public keyTerm: resources.KeyTermResource;
    public textCorpus: resources.TextCorpusResource;
    public user: resources.UserResource;

    private authorizationCode?: string;
    private baseAuthUrl: string;
    private clientId: string;
    private clientSecret?: string;
    private redirectUri?: string;

    private requestManager: RequestManager;

    public static create(clientConfig: HudAiClientConfiguration) {
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

        this.actionItems = new resources.ActionItemResource(this.requestManager);
        this.articleCompanies = new resources.ArticleCompanyResource(this.requestManager);
        this.articleKeyTerms = new resources.ArticleKeyTermResource(this.requestManager);
        this.articleTags = new resources.ArticleTagResource(this.requestManager);
        this.articles = new resources.ArticleResource(this.requestManager);
        this.collateral = new resources.CollateralResource(this.requestManager);
        this.companies = new resources.CompanyResource(this.requestManager);
        this.companyEvents = new resources.CompanyEventResource(this.requestManager);
        this.companyIndustries = new resources.CompanyIndustryResource(this.requestManager);
        this.companyKeyTerms = new resources.CompanyKeyTermResource(this.requestManager);
        this.companyProfiles = new resources.CompanyProfileResource(this.requestManager);
        this.domains = new resources.DomainResource(this.requestManager);
        this.feed = new resources.FeedResource(this.requestManager);
        this.highlights = new resources.HighlightResource(this.requestManager);
        this.industries = new resources.IndustryResource(this.requestManager);
        this.jobFunctions = new resources.JobFunctionResource(this.requestManager);
        this.keyTerms = new resources.KeyTermResource(this.requestManager);
        this.organizations = new resources.OrganizationResource(this.requestManager);
        this.people = new resources.PersonResource(this.requestManager);
        this.peopleKeyTerms = new resources.PersonKeyTermResource(this.requestManager);
        this.quotes = new resources.QuoteResource(this.requestManager);
        this.relevantArticleCollateral = new resources.RelevantArticleCollateralResource(this.requestManager);
        this.relevantArticles = new resources.RelevantArticleResource(this.requestManager);
        this.sources = new resources.SourceResource(this.requestManager);
        this.stockAlerts = new resources.StockAlertResource(this.requestManager);
        this.textCorpora = new resources.TextCorpusResource(this.requestManager);
        this.tweets = new resources.TweetResource(this.requestManager);
        this.userCompanies = new resources.UserCompanyResource(this.requestManager);
        this.userCompanyGroups = new resources.UserCompanyGroupResource(this.requestManager);
        this.userContacts = new resources.UserContactResource(this.requestManager);
        this.userDigestSubscriptions = new resources.UserDigestSubscriptionResource(this.requestManager);
        this.userIndustries = new resources.UserIndustryResource(this.requestManager);
        this.userJobFunctions = new resources.UserJobFunctionResource(this.requestManager);
        this.userKeyTerms = new resources.UserKeyTermResource(this.requestManager);
        this.userPeople = new resources.UserPersonResource(this.requestManager);
        this.userSources = new resources.UserSourceResource(this.requestManager);
        this.userTemplates = new resources.UserTemplateResource(this.requestManager);
        this.users = new resources.UserResource(this.requestManager);
        this.videos = new resources.VideoResource(this.requestManager);
        this.videoCompanies = new resources.VideoCompanyResource(this.requestManager);
        this.videoPeople = new resources.VideoPersonResource(this.requestManager);

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

    private addDeprecatedAttributes() {
        this.article = this.articles;
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
        .then(() => {
            delete this.authorizationCode;
        })
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
