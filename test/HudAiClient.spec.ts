import * as Chance from 'chance';
import * as moment from 'moment';
import * as nock from 'nock';
import {suite, test} from 'mocha-typescript';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import {HudAiClient, HudAiClientConfiguration} from '../lib/HudAiClient';
import {RequestManager} from '../lib/RequestManager';
import * as resources from '../lib/resources';
import {HudAiError} from '../lib/util/HudAiError';

chai.use(chaiAsPromised);
const expect = chai.expect;
nock.disableNetConnect();

const chance = new Chance();

const minimumConfig = {
    clientId: chance.guid()
}

const serverSideConfig = {
    clientId: chance.guid(),
    clientSecret: chance.guid()
};

const clientSideConfig = {
    clientId: chance.guid(),
    redirectUri: chance.url()
}

@suite
class HudAiClientSpec {

    @test
    create() {
        const client = HudAiClient.create(minimumConfig);
        expect(client).to.be.an.instanceOf(HudAiClient);

        expect(client.getAuthorizeUri).to.be.a('function');
        expect(client.refreshTokens).to.be.a('function');
        expect(client.setAccessToken).to.be.a('function');
        expect(client.setAuthorizationCode).to.be.a('function');

        expect(client.article).to.be.an.instanceOf(resources.ArticleResource);
        expect(client.articleHighlight).to.be.an.instanceOf(resources.ArticleHighlightResource);
        expect(client.company).to.be.an.instanceOf(resources.CompanyResource);
        expect(client.domain).to.be.an.instanceOf(resources.DomainResource);
        expect(client.keyTerm).to.be.an.instanceOf(resources.KeyTermResource);
        expect(client.textCorpus).to.be.an.instanceOf(resources.TextCorpusResource);
        expect(client.user).to.be.an.instanceOf(resources.UserResource);
    }

    @test
    '#getAuthorizeUri enforce redirectUri'() {
        const client = HudAiClient.create(serverSideConfig);

        expect(() => client.getAuthorizeUri()).to.throw(HudAiError);
    }

    @test
    '#getAuthorizeUri defaults'() {
        const client = HudAiClient.create(clientSideConfig);
        const authorizeUri = client.getAuthorizeUri();
        expect(authorizeUri).to.equal(
            'https://auth.hud.ai/oauth2/authorize' +
            '?response_type=code' +
            `&client_id=${clientSideConfig.clientId}` +
            `&redirect_uri=${clientSideConfig.redirectUri}`
        );
    }

    @test
    '#getAuthorizeUri with `token`'() {
        const client = HudAiClient.create(clientSideConfig);
        const authorizeUri = client.getAuthorizeUri('token');
        expect(authorizeUri).to.equal(
            'https://auth.hud.ai/oauth2/authorize' +
            '?response_type=token' +
            `&client_id=${clientSideConfig.clientId}` +
            `&redirect_uri=${clientSideConfig.redirectUri}`
        );
    }

    @test
    '#getAuthorizeUri with `code`'() {
        const client = HudAiClient.create(clientSideConfig);
        const authorizeUri = client.getAuthorizeUri('code');
        expect(authorizeUri).to.equal(
            'https://auth.hud.ai/oauth2/authorize' +
            '?response_type=code' +
            `&client_id=${clientSideConfig.clientId}` +
            `&redirect_uri=${clientSideConfig.redirectUri}`
        );
    }

    private authResponse = {
        access_token: chance.guid(),
        refresh_token: chance.guid(),
        expires_in: 24 * 60 * 60 * 1000
    };

    @test
    '#refreshTokens with unexpired token'() {
        const client = HudAiClient.create(serverSideConfig);

        client.tokenExpiresAt = moment().add(1, 'day').toDate();

        return expect(client.refreshTokens()).to.eventually.be.undefined;
    }

    @test
    '#refreshTokens with an authorization code'() {
        const code = chance.guid();
        const client = HudAiClient.create(serverSideConfig);

        client['authorizationCode'] = code;

        nock('https://auth.hud.ai')
        .post('/oauth2/token', {
            grant_type: 'authorization_code',
            code
        })
        .reply(200, this.authResponse);

        return client.refreshTokens()
        .then(() => {
            expect(client['authorizationCode']).to.be.undefined;

            expect(client.accessToken).to.equal(this.authResponse.access_token);

            expect(client.refreshToken).to.equal(this.authResponse.refresh_token);

            const expectedExpiration = moment.now() + this.authResponse.expires_in;
            expect(moment(client.tokenExpiresAt).unix()).to.be.within(
                moment(expectedExpiration - 100).unix(),
                moment(expectedExpiration + 100).unix()
            );
        })
    }

    @test
    '#refreshTokens with refresh token'() {
        const client = HudAiClient.create(serverSideConfig);

        client.refreshToken = chance.guid();

        nock('https://auth.hud.ai')
        .post('/oauth2/token', {
            grant_type: 'refresh_grant',
            refresh_token: client.refreshToken
        })
        .reply(200, this.authResponse);

        return client.refreshTokens()
        .then(() => {
            expect(client.accessToken).to.equal(this.authResponse.access_token);

            expect(client.refreshToken).to.equal(this.authResponse.refresh_token);

            const expectedExpiration = moment.now() + this.authResponse.expires_in;
            expect(moment(client.tokenExpiresAt).unix()).to.be.within(
                moment(expectedExpiration - 100).unix(),
                moment(expectedExpiration + 100).unix()
            );
        })
    }

    @test
    '#refreshTokens with only a client secret'() {
        const client = HudAiClient.create(serverSideConfig);

        nock('https://auth.hud.ai')
        .post('/oauth2/token', {
            grant_type: 'client_credentials'
        })
        .reply(200, this.authResponse);

        return client.refreshTokens()
        .then(() => {
            expect(client.accessToken).to.equal(this.authResponse.access_token);

            expect(client.refreshToken).to.equal(this.authResponse.refresh_token);

            const expectedExpiration = moment.now() + this.authResponse.expires_in;
            expect(moment(client.tokenExpiresAt).unix()).to.be.within(
                moment(expectedExpiration - 100).unix(),
                moment(expectedExpiration + 100).unix()
            );
        })
    }

    @test
    '#setAccessToken'() {
        const client = HudAiClient.create(clientSideConfig);

        expect(client.accessToken).to.be.undefined;

        const accessToken = chance.guid();
        client.setAccessToken(accessToken);
        expect(client.accessToken).to.equal(accessToken);
    }

    @test
    '#setAuthorizationCode'() {
        const client = HudAiClient.create(serverSideConfig);
        expect(client['authorizationCode']).to.be.undefined;

        const code = chance.guid();
        client.setAuthorizationCode(code);
        expect(client['authorizationCode']).to.equal(code);
    }
}
