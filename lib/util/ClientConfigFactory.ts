import { defaultsDeep } from 'lodash';
import * as https from 'https';
import joi from 'joi';
import {HudAiError} from './HudAiError';
const version = require('../../package.json').version;


export interface HudAiClientConfiguration {
    clientId: string;
    clientSecret: string;
    baseApiUrl?: string;
    apiVersion?: string;
    request?: object;
}

export const Schema = {
    clientId: joi.string().guid().required(),
    clientSecret: joi.string().guid().required(),
    baseApiUrl: joi.string().uri(),
    apiVersion: joi.string().allow('v1'),
    request: joi.object({
        strictSSL: joi.boolean()
    })
};

export function Factory (config: HudAiClientConfiguration) {
    const validation = joi.validate(config, Schema);
    if (validation.error) throw new HudAiError(validation.error.annotate());
    return defaultsDeep(config, {
        baseApiUrl: 'https://api.hud.ai',
        apiVersion: 'v1',
        request: {
            // By default, require API SSL cert to be valid
            strictSSL: true,
            // Use an agent with keep-alive enabled to avoid performing SSL handshake per connection
            agentClass: https.Agent,
            agentOptions: {
                keepAlive: true
            },
            // Encode requests as JSON. Encode the response as well if JSON is returned.
            json: true,
            // Do not encode the response as a string, since the response could be a file. return Buffers instead.
            encoding: null,
            // A redirect is usually information we want to handle, so don't automatically follow
            followRedirect: false,
            // By default, we attach a version-specific user-agent string to SDK requests
            headers: {
                'User-Agent': `Hud.ai Node SDK v${version}`
            },
            timeout: 60000

        }
    });
}