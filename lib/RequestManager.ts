import * as _ from 'lodash';
import * as Promise from 'bluebird';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Agent as HttpsAgent } from 'https';

import { HudAiClient, HudAiClientConfiguration } from './HudAiClient';
import { HudAiError } from './util/HudAiError';

export interface HudAiRequestAttributes {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    data?: object;
    params?: object;
    url: string;
}

const clientVersion = require('../../package.json').version;

const defaultAxiosConfig = <AxiosRequestConfig> {
    headers: { 'User-Agent': `HUD.ai Javascript SDK v${clientVersion}` },
    // Use an agent with keep-alive enabled to avoid performing SSL handshake
    // per connection.
    httpsAgent: new HttpsAgent({ keepAlive: true, rejectUnauthorized: true }),
    // A redirect is usually information we want to handle, so don't
    // automatically follow
    maxRedirects: 0,
    // Encode requests as JSON. Encode the response as well if JSON is returned.
    responseType: 'json',
    // Standard 10s timeout
    timeout: 10000
}

export class RequestManager {
    private axios: AxiosInstance;
    private client: HudAiClient;

    // Instance Methods

    constructor(client: HudAiClient, config: HudAiClientConfiguration) {
        this.client = client;

        const axiosConfig = _.chain(config.request)
            .merge({ baseURL: client.baseApiUrl })
            .defaults(defaultAxiosConfig)
            .value();
        this.axios = axios.create(axiosConfig);
    }

    public makeRequest (options: HudAiRequestAttributes) {
        const requestOptions = {
            body: options.data,
            method: options.method,
            params: options.params,
            url: this.buildUrl(options.url, options.params),
        };

        return Promise.resolve(this.client.refreshTokens())
            .then(() => {
                const bearerToken = this.client.accessToken;
                if (!bearerToken) return;
                _.set(
                    requestOptions,
                    'headers.Authorization',
                    `Bearer ${bearerToken}`
                );
            })
            .then(() => this.axios.request(requestOptions))
            .then(response => response.data)
            .catch(err => { throw new HudAiError(err.message, err.type); });
    }

    // Private Methods

    private buildUrl(url: string, params: Object = {}): string {
        return _.reduce(
            <ArrayLike<{}>>params,
            (url, value, key) => _.replace(url, `{${key}}`, <string>value),
            url
        );
    }
}
