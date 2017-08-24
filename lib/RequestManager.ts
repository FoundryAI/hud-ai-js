import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import * as Request from 'request-promise';
import * as _ from 'lodash';
import {HudAiError} from './util/HudAiError';
import {Session} from './Session';

export interface HudAiRequestAttributes {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    data?: object;
    query?: object;
    params?: object;
    url: string;
}

export class RequestManager {
    public config: HudAiClientConfiguration;
    public apiSession?: Session;

    constructor(config: HudAiClientConfiguration) {
        this.config = config;
    }

    public makeRequest (options: HudAiRequestAttributes) {
        const requestOptions = _.assignIn(this.config.request, {
            baseUrl: `${this.config.baseApiUrl}/${this.config.apiVersion}`,
            body: options.data,
            method: options.method,
            qs: options.query,
            uri: this.buildUrl(options)
        });

        return Request(requestOptions)
        .catch(err => { throw new HudAiError(err.message, err.type); })
    }

    private buildUrl(options: HudAiRequestAttributes): string {
        let url = options.url;
        _.mapKeys(<ArrayLike<{}>>options.params, (value, key) => {
            url = url.replace(`{${key}}`, <string>value)
        });
        return url;
    }
}