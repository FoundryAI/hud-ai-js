import { defaultsDeep } from 'lodash';
import * as https from 'https';
import * as joi from 'joi';
import {HudAiError} from './HudAiError';
import {AxiosRequestConfig} from "axios";
const version = require('../../package.json').version;


export interface HudAiClientConfiguration {
    clientId: string;
    clientSecret?: string;
    redirectUri?: string;
    baseApiUrl?: string;
    apiVersion?: string;
    request?: object;
}

export const Schema = {
    clientId: joi.string().guid().required(),
    clientSecret: joi.string().guid(),
    redirectUri: joi.string().uri(),
    baseApiUrl: joi.string().uri(),
    apiVersion: joi.string().allow('v1'),
    request: joi.object({
        // strictSSL: joi.boolean()
    })
};

export function Factory (config: HudAiClientConfiguration): HudAiClientConfiguration {
    const validation = joi.validate(config, Schema);
    if (validation.error) throw new HudAiError(validation.error.annotate());
    return defaultsDeep(config, {
        baseApiUrl: 'https://api.hud.ai',
        apiVersion: 'v1',
        request: <AxiosRequestConfig> {
            // Use an agent with keep-alive enabled to avoid performing SSL handshake per connection.
            httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: true }),

            // Encode requests as JSON. Encode the response as well if JSON is returned.
            responseType: 'json',
            // A redirect is usually information we want to handle, so don't automatically follow
            maxRedirects: 0,
            // By default, we attach a version-specific user-agent string to SDK requests
            headers: {
                'User-Agent': `Hud.ai Node SDK v${version}`
            },
            timeout: 10000

        }
    });
}
