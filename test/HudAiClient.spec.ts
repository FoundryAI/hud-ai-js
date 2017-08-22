
process.env.NODE_ENV = 'test';

import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';

import {HudAiClient} from '../lib/HudAiClient';
import {PersistentSession} from '../lib/sessions/PersistentSession';
import {TokenManager} from '../lib/TokenManager';
import {RequestManager} from '../lib/RequestManager';

const chance = new Chance();

@suite
class HudAiClientSpec {

    @test
    create() {
        const config = {clientId: chance.guid(), clientSecret: chance.guid()};
        const client = HudAiClient.create(config);
        expect(client).to.be.an.instanceOf(HudAiClient);
        expect(client.apiSession).to.be.an.instanceOf(PersistentSession);
        expect(client.requestManager).to.be.an.instanceOf(RequestManager);
        expect(client.tokenManager).to.be.an.instanceOf(TokenManager);
    }

}