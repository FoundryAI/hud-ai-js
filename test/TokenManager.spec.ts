
import * as moment from 'moment';

process.env.NODE_ENV = 'test';

import * as nock from 'nock';
import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import {Factory, HudAiClientConfiguration} from '../lib/util/ClientConfigFactory';
import {RequestManager} from '../lib/RequestManager';
import {TokenInfo, TokenManager} from '../lib/TokenManager';

chai.use(sinonChai);
nock.disableNetConnect();
const expect = chai.expect;
const chance = new Chance();
const accessToken = chance.guid();
const refreshToken = chance.guid();
const tokensInfo = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: 604800000
};


@suite
class TokenManagerSpec {
    private config: HudAiClientConfiguration;
    private requestManager: RequestManager;

    before () {
        nock('https://api.hud.ai/v1')
        .post('/auth/oauth2/token')
        .reply(200, tokensInfo);

        this.config = Factory({clientId: chance.guid(), clientSecret: chance.guid()});
        this.requestManager = new RequestManager(this.config);
    }

    @test
    static () {
        expect(TokenManager.isAccessTokenValid).to.be.a('function');
    }

    @test
    instantiate () {
        const tokenManager = new TokenManager(this.config, this.requestManager);
        expect(tokenManager).to.be.an.instanceOf(TokenManager);
        expect(tokenManager.getTokensClientCredentialsGrant).to.be.a('function');
        expect(tokenManager.getTokensRefreshGrant).to.be.a('function');
    }

    @test
    getTokensClientCredentialsGrant () {
        const tokenManager = new TokenManager(this.config, this.requestManager);
        return tokenManager.getTokensClientCredentialsGrant()
        .then((tokensInfo: TokenInfo) => {
            expect(tokensInfo.accessToken).to.equal(accessToken);
            expect(tokensInfo.refreshToken).to.equal(refreshToken);
        })
    }

    @test
    getTokensAuthorizationGrant () {
        const tokenManager = new TokenManager(this.config, this.requestManager);
        return tokenManager.getTokensAuthorizationGrant('myfakeauthorizationcode')
        .then((tokensInfo: TokenInfo) => {
            expect(tokensInfo.accessToken).to.equal(accessToken);
            expect(tokensInfo.refreshToken).to.equal(refreshToken);
        })
    }

    @test
    getTokensRefreshGrant () {
        const tokenManager = new TokenManager(this.config, this.requestManager);
        return tokenManager.getTokensRefreshGrant(refreshToken)
        .then((tokensInfo: TokenInfo) => {
            expect(tokensInfo.accessToken).to.equal(accessToken);
            expect(tokensInfo.refreshToken).to.equal(refreshToken);
        })
    }

    @test
    isAccessTokenValid () {
        expect(TokenManager.isAccessTokenValid({
            accessToken,
            refreshToken,
            accessTokenTTLMS: 86400000,
            accessTokenAcquiredAtMS: +moment()
        })).to.be.true;
    }

    @test
    isAccessTokenInvalid () {
        expect(TokenManager.isAccessTokenValid({
            accessToken,
            refreshToken,
            accessTokenTTLMS: 86400000,
            accessTokenAcquiredAtMS: +moment().subtract(2, 'days')
        })).to.be.false;
    }

}