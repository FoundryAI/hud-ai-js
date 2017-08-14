import {RequestManager} from '../lib/RequestManager';

process.env.NODE_ENV = 'test';

import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import * as moment from 'moment';

import {HudAiClient} from '../lib/HudAiClient';
import {HudAiSDK} from '../lib/HudAiSDK';
import {BasicSession} from '../lib/sessions/BasicSession';
import {PersistentSession} from '../lib/sessions/PersistentSession';
import {TokenManager} from '../lib/TokenManager';

const chance = new Chance();
const accessToken = chance.guid();
const refreshToken = chance.guid();


@suite
class HudAiSDKSpec {
    @test
    instantiate() {
        const config = {clientId: chance.guid(), clientSecret: chance.guid()};
        const sdk = new HudAiSDK(config);
        expect(sdk).to.be.an.instanceOf(HudAiSDK);
        expect(sdk.config.clientId).to.equal(config.clientId);
        expect(sdk.config.clientSecret).to.equal(config.clientSecret);
        expect(sdk.requestManager).to.be.an.instanceOf(RequestManager);
        expect(sdk.tokenManager).to.be.an.instanceOf(TokenManager);
    }

    @test
    basicClient() {
        const config = {clientId: chance.guid(), clientSecret: chance.guid()};
        const sdk = new HudAiSDK(config);
        const client = sdk.getBasicClient(accessToken);
        expect(client).to.be.an.instanceOf(HudAiClient);
        expect(client.apiSession).to.be.an.instanceOf(BasicSession);
        expect(client.requestManager).to.be.an.instanceOf(RequestManager);
    }

    @test
    persistentClientNoTokenStore() {
        const config = {clientId: chance.guid(), clientSecret: chance.guid()};
        const sdk = new HudAiSDK(config);
        const client = sdk.getPersistentClient({
            accessToken: accessToken,
            refreshToken: refreshToken,
            accessTokenAcquiredAtMS: +moment(),
            accessTokenTTLMS: 3000
        });
        expect(client).to.be.an.instanceOf(HudAiClient);
        expect(client.apiSession).to.be.an.instanceOf(PersistentSession);
        expect(client.requestManager).to.be.an.instanceOf(RequestManager);
    }
}