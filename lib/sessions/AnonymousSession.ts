import {HudAiClientConfiguration} from '../util/ClientConfigFactory';
import {TokenManager} from '../TokenManager';

export class AnonymousSession {
    public config: HudAiClientConfiguration;
    public tokenManager: TokenManager;

    constructor (config: HudAiClientConfiguration, tokenManager: TokenManager) {

    }
}