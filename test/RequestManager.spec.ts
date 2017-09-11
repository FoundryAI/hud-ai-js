import * as nock from 'nock';
import * as Chance from 'chance';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { HudAiClient, HudAiClientConfiguration } from '../lib/HudAiClient';
import { Factory } from '../lib/util/ClientConfigFactory';
import { RequestManager } from '../lib/RequestManager';

chai.use(sinonChai);
nock.disableNetConnect();
const expect = chai.expect;
const chance = new Chance();

@suite
class RequestManagerSpec {
    private sandbox: any;
    private config: HudAiClientConfiguration;
    private client: HudAiClient;

    before() {
        this.sandbox = sinon.sandbox.create();
        this.config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        this.client = new HudAiClient({ clientId: chance.guid() });
    }
    after() { this.sandbox.restore(); }

    @test instantiate() {
        const requestManager = new RequestManager(this.client, this.config);
        expect(requestManager).to.be.an.instanceOf(RequestManager);
        expect(requestManager.makeRequest).to.be.a('function');
    }

    @test makeRequest() {
        const config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        const requestManager = new RequestManager(this.client, config);
        nock('https://api.hud.ai/v1')
        .get('/')
        .query(true)
        .reply(200, 'ok');

        // TODO - come back to this and check spy.calledWith
        return requestManager.makeRequest({
            method: 'GET',
            url: '/',
            params: { test: 'param' }
        })
    }

    @test makeRequestWithPort() {
        const config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        const client = new HudAiClient({ clientId: chance.guid(), baseApiUrl: 'http://localhost:3000/v1' });
        const requestManager = new RequestManager(client, config);
        nock('http://localhost:3000/v1')
        .get('/')
        .query(true)
        .reply(200, 'ok');

        // TODO - come back to this and check spy.calledWith
        return requestManager.makeRequest({
            method: 'GET',
            url: '/',
            params: { test: 'param' }
        })
    }
}
