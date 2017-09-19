import * as nock from 'nock';
import * as Chance from 'chance';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as moment from 'moment';

import { Factory } from '../../lib/utils/ClientConfigFactory';
import { HudAiClient, HudAiClientConfiguration } from '../../lib/HudAiClient';
import { RequestManager } from '../../lib/RequestManager';
import { UserResource } from '../../lib/resources/User';

chai.use(sinonChai);
nock.disableNetConnect();
const expect = chai.expect;
const chance = new Chance();
const clientId = chance.guid();
const clientSecret = chance.guid();
const accessToken = chance.guid();
const refreshToken = chance.guid();

@suite
class UserSpec {
    private sandbox: any;
    private config: HudAiClientConfiguration;
    private requestManager: RequestManager;
    private client: HudAiClient;

    before() {
        this.sandbox = sinon.sandbox.create();
        this.config = Factory({ clientId, clientSecret });
        this.client = new HudAiClient(this.config);
        this.requestManager = new RequestManager(this.client, this.config);
    }

    after() {
        this.sandbox.restore();
    }

    @test
    instantiate() {
        const config = Factory({ clientId: chance.guid(), clientSecret: chance.guid() });
        const resource = new UserResource(this.requestManager);
        expect(resource.get).to.be.a('function');
        expect(resource.list).to.be.a('function');
        expect(resource.create).to.be.a('function');
        expect(resource.update).to.be.a('function');
        expect(resource.del).to.be.a('function');
    }

}
