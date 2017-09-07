import { defaultsDeep } from 'lodash';
import * as joi from 'joi';

import { HudAiError } from './HudAiError';
import { HudAiClientConfiguration } from '../HudAiClient';
import { defaultAxiosConfig } from '../RequestManager';

export const Schema = {
    clientId: joi.string().guid().required(),
    clientSecret: joi.string().guid(),
    redirectUri: joi.string().uri(),
    baseApiUrl: joi.string().uri(),
    baseAuthUrl: joi.string().uri(),
    request: joi.object({
        // strictSSL: joi.boolean()
    })
};

export function Factory (config: HudAiClientConfiguration): HudAiClientConfiguration {
    const validation = joi.validate(config, Schema);
    if (validation.error) throw new HudAiError(validation.error.annotate());
    return defaultsDeep(config, {
        baseApiUrl: 'https://api.hud.ai/v1',
        baseAuthUrl: 'https://auth.hud.ai',
        request: defaultAxiosConfig
    });
}
