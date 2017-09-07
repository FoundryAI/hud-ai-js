import * as Chance from 'chance';
import * as moment from 'moment';
import * as nock from 'nock';
import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';

import { HudAiClient, HudAiClientConfiguration } from '../lib/HudAiClient';
import { RequestManager } from '../lib/RequestManager';
import { HudAiError } from '../lib/util/HudAiError';

import { ArticleResource } from '../lib/resources/Article';
import { ArticleHighlightResource } from '../lib/resources/ArticleHighlight';
import { CompanyResource } from '../lib/resources/Company';
import { DomainResource } from '../lib/resources/Domain';
import { KeyTermResource } from '../lib/resources/KeyTerm';
import { TextCorpusResource } from '../lib/resources/TextCorpus';
import { UserResource } from '../lib/resources/User';

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

    before() {}

    @test
    create() {
        const client = HudAiClient.create(minimumConfig);
        expect(client).to.be.an.instanceOf(HudAiClient);

        expect(client.getAuthorizeUri).to.be.a('function');
        expect(client.refreshTokens).to.be.a('function');
        expect(client.setAccessToken).to.be.a('function');
        expect(client.setAuthorizationCode).to.be.a('function');

        expect(client.article).to.be.an.instanceOf(ArticleResource);
        expect(client.articleHighlight).to.be.an.instanceOf(ArticleHighlightResource);
        expect(client.company).to.be.an.instanceOf(CompanyResource);
        expect(client.domain).to.be.an.instanceOf(DomainResource);
        expect(client.keyTerm).to.be.an.instanceOf(KeyTermResource);
        expect(client.textCorpus).to.be.an.instanceOf(TextCorpusResource);
        expect(client.user).to.be.an.instanceOf(UserResource);
    }

    @test
    '#getAuthorizeUri enforce redirectUri'() {
        const client = HudAiClient.create(serverSideConfig);

        expect(client.getAuthorizeUri()).to.throw(HudAiError);
    }

    @test
    '#getAuthorizeUri defaults'() {
        const client = HudAiClient.create(clientSideConfig);
        const authorizeUri = client.getAuthorizeUri();
        expect(authorizeUri).to.equal(
            'https://api.hud.ai/v1/auth/authorize?' +
                'response_type=token' +
                `&client_id=${clientSideConfig.clientId}` +
                `&redirect_uri=${clientSideConfig.redirectUri}`
        );
    }

    @test
    '#getAuthorizeUri with `token`'() {
        const client = HudAiClient.create(clientSideConfig);
        const authorizeUri = client.getAuthorizeUri('token');
        expect(authorizeUri).to.equal(
            'https://api.hud.ai/v1/auth/authorize?' +
            'response_type=token' +
            `&client_id=${clientSideConfig.clientId}` +
            `&redirect_uri=${clientSideConfig.redirectUri}`
        );
    }

    @test
    '#getAuthorizeUri with `code`'() {
        const client = HudAiClient.create(clientSideConfig);
        const authorizeUri = client.getAuthorizeUri('code');
        expect(authorizeUri).to.equal(
            'https://api.hud.ai/v1/auth/authorize?' +
            'response_type=code' +
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

        expect(Promise.resolve(client.refreshTokens())).to.be.null;
    }

    @test
    '#refreshTokens with an authorization code'() {
        const client = HudAiClient.create(serverSideConfig);

        client['authorizationCode'] = chance.guid();

        nock('https://auth.hud.ai')
            .post('/oauth2/token')
            .reply(200, this.authResponse);

        return client.refreshTokens()
            .then(() => {
                expect(client['authorizationCode']).to.be.undefined;

                expect(client.accessToken).to.equal(this.authResponse.access_token);

                expect(client.refreshToken).to.equal(this.authResponse.refresh_token);

                const expectedExpiration = moment.now() + this.authResponse.expires_in;
                expect(moment(client.tokenExpiresAt).unix()).to.be.within(
                    expectedExpiration - 100,
                    expectedExpiration + 100
                );
            })
    }

    @test
    '#refreshTokens with refresh token'() {
        const client = HudAiClient.create(serverSideConfig);

        client.refreshToken = chance.guid();

        nock('https://auth.hud.ai')
            .post('/oauth2/token')
            .reply(200, this.authResponse);

        return client.refreshTokens()
            .then(() => {
                expect(client.accessToken).to.equal(this.authResponse.access_token);

                expect(client.refreshToken).to.equal(this.authResponse.refresh_token);

                const expectedExpiration = moment.now() + this.authResponse.expires_in;
                expect(moment(client.tokenExpiresAt).unix()).to.be.within(
                    expectedExpiration - 100,
                    expectedExpiration + 100
                );
            })
    }

    @test
    '#refreshTokens with only a client secret'() {
        const client = HudAiClient.create(serverSideConfig);

        nock('https://auth.hud.ai')
            .post('/oauth2/token')
            .reply(200, this.authResponse);

        return client.refreshTokens()
            .then(() => {
                expect(client.accessToken).to.equal(this.authResponse.access_token);

                expect(client.refreshToken).to.equal(this.authResponse.refresh_token);

                const expectedExpiration = moment.now() + this.authResponse.expires_in;
                expect(moment(client.tokenExpiresAt).unix()).to.be.within(
                    expectedExpiration - 100,
                    expectedExpiration + 100
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
