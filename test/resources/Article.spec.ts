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
import { ArticleResource } from '../../lib/resources/Article';

chai.use(sinonChai);
nock.disableNetConnect();
const expect = chai.expect;
const chance = new Chance();
const clientId = chance.guid();
const clientSecret = chance.guid();
const accessToken = chance.guid();
const refreshToken = chance.guid();

@suite
class ArticleSpec {
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
        const articleResource = new ArticleResource(this.requestManager);
        expect(articleResource.get).to.be.a('function');
        expect(articleResource.list).to.be.a('function');
        expect(articleResource.create).to.be.a('function');
        expect(articleResource.update).to.be.a('function');
        expect(articleResource.del).to.be.a('function');
    }

}
