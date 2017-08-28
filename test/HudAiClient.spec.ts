


process.env.NODE_ENV = 'test';

import * as Chance from 'chance';
import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';

import {Session} from '../lib/Session';
import {HudAiClient} from '../lib/HudAiClient';
import {TokenManager} from '../lib/TokenManager';
import {RequestManager} from '../lib/RequestManager';

import {ArticleResource} from '../lib/resources/Article';
import {ArticleHighlightResource} from '../lib/resources/ArticleHighlight';
import {CompanyResource} from '../lib/resources/Company';
import {DomainResource} from '../lib/resources/Domain';
import {KeyTermResource} from '../lib/resources/KeyTerm';
import {TextCorpusResource} from '../lib/resources/TextCorpus';
import {UserResource} from '../lib/resources/User';

const chance = new Chance();

@suite
class HudAiClientSpec {

    @test
    create() {
        const config = {clientId: chance.guid(), clientSecret: chance.guid()};
        const client = HudAiClient.create(config);
        expect(client).to.be.an.instanceOf(HudAiClient);
        expect(client.apiSession).to.be.an.instanceOf(Session);
        expect(client.requestManager).to.be.an.instanceOf(RequestManager);
        expect(client.tokenManager).to.be.an.instanceOf(TokenManager);

        expect(client.getAuthorizeUri).to.be.a('function');
        expect(client.getTokensClientCredentialsGrant).to.be.a('function');
        expect(client.getTokensAuthorizationGrant).to.be.a('function');
        expect(client.getTokensRefreshGrant).to.be.a('function');

        expect(client.article).to.be.an.instanceOf(ArticleResource);
        expect(client.articleHighlight).to.be.an.instanceOf(ArticleHighlightResource);
        expect(client.company).to.be.an.instanceOf(CompanyResource);
        expect(client.domain).to.be.an.instanceOf(DomainResource);
        expect(client.keyTerm).to.be.an.instanceOf(KeyTermResource);
        expect(client.textCorpus).to.be.an.instanceOf(TextCorpusResource);
        expect(client.user).to.be.an.instanceOf(UserResource);
    }

    @test
    getAuthorizeUri() {
        const config = {clientId: chance.guid(), redirectUri: chance.url()};
        const client = HudAiClient.create(config);
        const authorizeUri = client.getAuthorizeUri();
        expect(authorizeUri).to.equal(`https://api.hud.ai/v1/auth/authorize?response_type=token&client_id=${config.clientId}&redirect_uri=${config.redirectUri}`);
    }

}