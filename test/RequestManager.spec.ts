process.env.NODE_ENV = 'test';

import * as nock from 'nock';
import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as request from 'request-promise';

import {Factory} from '../lib/util/ClientConfigFactory';
import {RequestManager} from '../lib/RequestManager';

chai.use(sinonChai);
nock.disableNetConnect();
const expect = chai.expect;
const chance = new Chance();

@suite
class RequestManagerSpec {
    private sandbox: any;

    before() { this.sandbox = sinon.sandbox.create(); }
    after() { this.sandbox.restore(); }

    @test instantiate() {
        const config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        const requestManager = new RequestManager(config);
        expect(requestManager).to.be.an.instanceOf(RequestManager);
        expect(requestManager.makeRequest).to.be.a('function');
    }

    @test makeRequest() {
        const config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        const requestManager = new RequestManager(config);
        const spy = this.sandbox.spy(request);
        nock('https://api.hud.ai/v1')
        .get('/')
        .query(true)
        .reply(200, 'ok');

        // TODO - come back to this and check spy.calledWith
        return requestManager.makeRequest({
            method: 'GET',
            url: '/',
            query: { test: 'param' }
        })
    }
}