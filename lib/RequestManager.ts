import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import {RequestPromise} from 'request-promise';
import * as _ from 'lodash';
import {HudAiError} from './util/HudAiError';

export interface HudAiRequestAttributes {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    data?: object;
    query?: object;
    params?: object;
    url: string;
}

export class RequestManager {
    public config: HudAiClientConfiguration;

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

        return RequestPromise(requestOptions)
        .catch(err => { throw new HudAiError(err.message, err.type); })
    }

    private buildUrl(options: HudAiRequestAttributes): string {
        let url = options.url;
        _.mapKeys(options.params, (value, key) => {
            url = url.replace(`{${key}}`, value)
        });
        return url;
    }
}