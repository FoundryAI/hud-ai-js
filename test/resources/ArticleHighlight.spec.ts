process.env.NODE_ENV = 'test';

import * as nock from 'nock';
import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import {Factory, HudAiClientConfiguration} from '../../lib/util/ClientConfigFactory';
import {TokenManager} from '../../lib/TokenManager';
import {RequestManager} from '../../lib/RequestManager';
import {Session} from '../../lib/Session';
import * as moment from 'moment';
import {ArticleHighlightResource} from '../../lib/resources/ArticleHighlight';

chai.use(sinonChai);
nock.disableNetConnect();
const expect = chai.expect;
const chance = new Chance();
const clientId = chance.guid();
const clientSecret = chance.guid();
const accessToken = chance.guid();

@suite
class ArticleHighlightSpec {
    private sandbox: any;
    private config: HudAiClientConfiguration;
    private tokenManager: TokenManager;
    private session: Session;
    private requestManager: RequestManager;

    before() {
        this.sandbox = sinon.sandbox.create();
        this.config = Factory({ clientId, clientSecret });
        this.requestManager = new RequestManager(this.config);
        this.tokenManager = new TokenManager(this.config, this.requestManager);
        this.session = new Session(this.config, this.tokenManager);
    }

    after() {
        this.sandbox.restore();
    }

    @test
    instantiate() {
        const config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        const resource = new ArticleHighlightResource(this.session, this.requestManager);
        expect(resource.get).to.be.a('function');
        expect(resource.list).to.be.a('function');
        expect(resource.create).to.be.a('function');
        expect(resource.update).to.be.a('function');
        expect(resource.del).to.be.a('function');
    }

}