# HUD.ai Javascript Client

[![Version][npm-version-badge]][npm-version-link]
[![Build Status][build-status-badge]][build-status-link]
[![Downloads][downloads-badge]][downloads-link]
[![Try on RunKit][runkit-badge]][runkit-link]

A JavaScript interface to the [Hud.ai API][hud-ai-docs-link]. To get started
install via npm:

```bash
npm install --save hud-ai
```

## Getting Started

First, you'll need to register a client application. This can currently only be
done by [reaching out to the engineering team](mailto:engineering@hud.ai).

### Single Page Apps

```js
const HudAi = require('hud-ai');

const client = HudAi.create({
  clientId: 'CLIENT_ID',
  redirectUri: 'http://www.example.com/oauth/callbacks/hud-ai'
});

// Send the user to the authorization URL, where they can choose to grant your
// app permissions to access the service on their behalf (if permission has
// already been given, they'll automatically be redirected)
window.location = client.getAuthorizeUri('token');

// token will be returned as the query param `authToken` to your redirect URL
const querystring = require('query-string');
const parsed = querystring.parse(location.hash);
client.setAccessToken(parsed.access_token);
```

NOTE: The process of token retrieval will need to be performed again when the
token becomes invalid (they're currently valid for 30 days).

### Server Applications

Because servers can be trusted to keep a secret, setup is much more
straightforward.

Client Authentication:

```js
const HudAi = require('hud-ai');

const client = HudAi.create({
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
});
```

Acting on behalf of a user:

```js
const redirectUrl = client.getAuthorizeUri('code');

// Send the user to the authorization URL, where they can choose to grant your
// app permissions to access the service on their behalf (if permission has
// already been given, they'll automatically be redirected)

// the code to exchange will be returned as the query param `code` to your
// redirect URL
const querystring = require('query-string');
const parsed = querystring.parse(location.search);
client.setAuthorizationCode(parsed.code);
```

### Parameters

| Parameter | Usage | Example |
|-----------|-------|---------|
| `clientId`*    | Registered Client ID | `'46ef9d9b-89a9-4fd2-84cf-af6de31f2618'` |
| `clientSecret` | Registered Client Secret | `'59170c3e-e2c9-4244-92d8-c3595d4af325'` |
| `baseApiUrl`   | Specify an alternate server to request resources from | `'https://stage.api.hud.ai/v1'` |
| `baseAuthUrl`  | Specify an alternate server to request auth tokens from | `'https://stage.accounts.hud.ai'` |
| `redirectUri`  | Path to redirect auth requests to (required for `#get_authorize_uri`) | `'https://app.example.com/oauth/callbacks/hud-ai'` |
| `request`      | [`axios`][axios-project-link] is used under the hood, pass a config through here | |

## Basic Usage

```js
client.articles.get('SOME_ARTICLE_ID')
  .then(article => console.log(article))
  .catch(err => console.log('Got an error!', err));
```

## Resources

### Notes

* `*` and bolded `Type` indicates required param
* All list resources have a max of 50 elements per request (e.g. `limit`s higher than that will have no effect)

| Entity | Method Base |
|--------|-------------|
| Article                   | [client.articles](docs/Article.md) |
| ArticleHighlights         | [client.articleHighlights](docs/ArticleHighlights.d') |
| ArticleKeyTerm            | [client.articleKeyTerms](docs/ArticleKeyTerm.md) |
| ArticleTag                | [client.articleTags](docs/ArticleTag.md) |
| Company                   | [client.companies](docs/Company.md) |
| CompanyEvent              | [client.companyEvents](docs/CompanyEvent.md) |
| CompanyIndustry           | [client.companyIndustries](docs/CompanyIndustry.md) |
| CompanyKeyTerm            | [client.companyKeyTerms](docs/CompanyKeyTerm.md) |
| CompanyProfile            | [client.companyProfile](docs/CompanyProfile.md) |
| Domain                    | [client.domains](docs/Domain.md) |
| Industry                  | [client.industries](docs/Industry.md) |
| KeyTerm                   | [client.keyTerms](docs/KeyTerm.md) |
| Person                    | [client.people](docs/Person.md) |
| PersonKeyTerm             | [client.personKeyTerms](docs/PersonKeyTerm.md) |
| Quote                     | [client.quotes](docs/Quote.md) |
| RelevantArticle           | [client.relevantArticles](docs/RelevantArticle.md) |
| RelevantArticleCollateral | [client.relevantArticleCollateral](docs/RelevantArticleCollateral.md) |
| Source                    | [client.sources](docs/Source.md) |
| TextCorpus                | [client.textCorpora](docs/TextCorpus.md) |
| Tweet                     | [client.tweets](docs/Tweet.md) |
| User                      | [client.users](docs/User.md) |
| UserCompany               | [client.userCompanies](docs/UserCompany.md) |
| UserCompanyGroup          | [client.userCompanyGroups](docs/UserCompanyGroup.md) |
| UserContact               | [client.userContacts](docs/UserContact.md) |
| UserDigestSubscription    | [client.userDigestSubscriptions](docs/UserDigestSubscription.md) |
| UserKeyTerm               | [client.userKeyTerms](docs/UserKeyTerm.md) |
| UserSource                | [client.userSources](docs/UserSource.md) |
| UserTemplate              | [client.userTemplates](docs/UserTemplate.md) |
| Video                     | [client.videos](docs/Video.md) |

[npm-version-badge]: https://img.shields.io/npm/v/hud-ai.svg
[npm-version-link]: https://www.npmjs.org/package/hud-ai
[build-status-badge]: https://travis-ci.org/FoundryAI/hud-ai-js.svg?branch=master
[build-status-link]: https://travis-ci.org/FoundryAI/hud-ai-js
[downloads-badge]: https://img.shields.io/npm/dm/hud-ai.svg
[downloads-link]: https://www.npmjs.com/package/hud-ai
[runkit-badge]: https://badge.runkitcdn.com/hud-ai.svg
[runkit-link]: https://runkit.com/npm/hud-ai-node

[axios-project-link]: https://github.com/mzabriskie/axios#request-config
[hud-ai-docs-link]: https://docs.hud.ai
[project-config-link]: https://github.com/FoundryAI/hud-ai-node/blob/master/lib/util/ClientConfigFactory.ts#L16
