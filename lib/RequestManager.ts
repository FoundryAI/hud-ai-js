import {HudAiClientConfiguration} from './util/ClientConfigFactory';
import * as _ from 'lodash';
import {HudAiError} from './util/HudAiError';
import {Session} from './Session';
import * as Promise from 'bluebird';
import Axios from 'axios';

export interface HudAiRequestAttributes {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    data?: object;
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
            baseURL: `${this.config.baseApiUrl}/${this.config.apiVersion}`,
            body: options.data,
            method: options.method,
            params: options.params,
            url: this.buildUrl(options)
        });

        return Promise.resolve(Axios(requestOptions))
        .then(response => response.data)
        .catch(err => { throw new HudAiError(err.message, err.type); });
    }

    private buildUrl(options: HudAiRequestAttributes): string {
        let url = options.url;
        _.mapKeys(<ArrayLike<{}>>options.params, (value, key) => {
            url = url.replace(`{${key}}`, <string>value)
        });
        return url;
    }
}
