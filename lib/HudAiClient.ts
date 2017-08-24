import { ArticleResource } from './resources/Article';
import {Factory, HudAiClientConfiguration} from './util/ClientConfigFactory';
import {RequestManager} from './RequestManager';
import {ArticleHighlightResource} from './resources/ArticleHighlight';
import {CompanyResource} from './resources/Company';
import {DomainResource} from './resources/Domain';
import {KeyTermResource} from './resources/KeyTerm';
import {TextCorpusResource} from './resources/TextCorpus';
import {UserResource} from './resources/User';
import {TokenManager} from './TokenManager';
import {Session} from './Session';
import * as _ from 'lodash';

export class HudAiClient {
    public config: HudAiClientConfiguration;
    public apiSession: Session;
    public requestManager: RequestManager;
    public tokenManager: TokenManager;
    public article: ArticleResource;
    public articleHighlight: ArticleHighlightResource;
    public company: CompanyResource;
    public domain: DomainResource;
    public keyTerm: KeyTermResource;
    public textCorpus: TextCorpusResource;
    public user: UserResource;

    public static create (clientConfig: HudAiClientConfiguration) {
        const config = Factory(clientConfig);
        const requestManager = new RequestManager(config);
        const tokenManager = new TokenManager(config, requestManager);
        const session = new Session(config, tokenManager);
        return new HudAiClient(config, session, requestManager, tokenManager);
    }

    constructor(config: HudAiClientConfiguration, apiSession: Session, requestManager: RequestManager, tokenManager: TokenManager) {
        this.config = config;
        this.apiSession = apiSession;
        this.requestManager = requestManager;
        this.tokenManager = tokenManager;

        this.article = new ArticleResource(apiSession, requestManager);
        this.articleHighlight = new ArticleHighlightResource(apiSession, requestManager);
        this.company = new CompanyResource(apiSession, requestManager);
        this.domain = new DomainResource(apiSession, requestManager);
        this.keyTerm = new KeyTermResource(apiSession, requestManager);
        this.textCorpus = new TextCorpusResource(apiSession, requestManager);
        this.user = new UserResource(apiSession, requestManager);
    }

    getAuthorizeUri () {
        return `${this.config.baseApiUrl}/${this.config.apiVersion}/auth/dialog/authorize?response_type=token&client_id=${this.config.clientId}&redirect_uri=${this.config.redirectUri}`
    }

    getTokensClientCredentialsGrant() {
        return this.tokenManager.getTokensClientCredentialsGrant();
    }

    getTokensAuthorizationGrant (authorizationCode: string) {
        return this.tokenManager.getTokensAuthorizationGrant(authorizationCode);
    }

    getTokensRefreshGrant (refreshToken) {
        return this.tokenManager.getTokensRefreshGrant(refreshToken);
    }

}