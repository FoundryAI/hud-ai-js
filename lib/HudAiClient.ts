import { ArticleResource } from './resources/Article';
import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import {BasicSession} from './sessions/BasicSession';
import {PersistentSession} from './sessions/PersistentSession';
import {RequestManager} from './RequestManager';

export class HudAiClient {
    public config: HudAiClientConfiguration;
    public apiSession: BasicSession|PersistentSession;
    public requestManager: RequestManager;
    public article: ArticleResource;

    constructor(config: HudAiClientConfiguration, apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        this.config = config;
        this.apiSession = apiSession;
        this.requestManager = requestManager;

        this.article = new ArticleResource(config, requestManager);
    }
}