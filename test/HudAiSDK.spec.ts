process.env.NODE_ENV = 'test';
import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import * as moment from 'moment';
import { HudAiSDK } from '../lib/HudAiSDK';
const chance = new Chance();

@suite
class HudAiSDKSpec {
    @test instantiate() {
        const config = { clientId: chance.guid(), clientSecret: chance.guid() };
        const sdk = new HudAiSDK(config);
        expect(sdk).to.be.an.instanceOf(HudAiSDK);
        expect(sdk.config.clientId).to.equal(config.clientId);
        expect(sdk.config.clientSecret).to.equal(config.clientSecret);
    }
}