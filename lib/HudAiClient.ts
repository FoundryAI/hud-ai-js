import { ArticleResource } from './resources/Article';
import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import {BasicSession} from './sessions/BasicSession';
import {PersistentSession} from './sessions/PersistentSession';
import {RequestManager} from './RequestManager';
import {ArticleHighlightResource} from './resources/ArticleHighlight';
import {CompanyResource} from './resources/Company';
import {DomainResource} from './resources/Domain';
import {KeyTermResource} from './resources/KeyTerm';
import {TextCorpusResource} from './resources/TextCorpus';
import {UserResource} from './resources/User';

export class HudAiClient {
    public config: HudAiClientConfiguration;
    public apiSession: BasicSession|PersistentSession;
    public requestManager: RequestManager;
    public article: ArticleResource;
    public articleHighlight: ArticleHighlightResource;
    public company: CompanyResource;
    public domain: DomainResource;
    public keyTerm: KeyTermResource;
    public textCorpus: TextCorpusResource;
    public user: UserResource;

    constructor(config: HudAiClientConfiguration, apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        this.config = config;
        this.apiSession = apiSession;
        this.requestManager = requestManager;

        this.article = new ArticleResource(apiSession, requestManager);
        this.articleHighlight = new ArticleHighlightResource(apiSession, requestManager);
        this.company = new CompanyResource(apiSession, requestManager);
        this.domain = new DomainResource(apiSession, requestManager);
        this.keyTerm = new KeyTermResource(apiSession, requestManager);
        this.textCorpus = new TextCorpusResource(apiSession, requestManager);
        this.user = new UserResource(apiSession, requestManager);
    }
}