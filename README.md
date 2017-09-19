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
const parsed = querystring.parse(location.search);
client.setAccessToken(parsed.authToken);
```

NOTE: The process of token retrieval will need to be performed again when the
token becomes invalid (they're currently valid for 24 hours).

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

> **DOCUMENTATION NOTES**
>
> - `*` and bolded `Type` indicates required param
> - All `list` resources have a max of 50 elements per request (e.g. `limit`s higher than that will have no effect)

### Article

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`              | string     | Resource ID **Cannot be edited** |
| `article_type`*   | **string** | `rss` \| `newsApi` \| `facebook` \| `twitter` |
| `authors`         | string[]   | List of author names |
| `imageUrl`        | string     | Image published in the article's metadata |
| `importanceScore` | number     | `hudai-importance-scorer` output |
| `linkHash`        | string     | MD5 hash of the `link_url` **Cannot be edited** |
| `linkUrl`*        | **string** | Where the article was originally published (e.g. `https://www.nytimes.com/2017/08/01/world/middleeast/mosul-isis-survivors-rights.html`) |
| `publishedAt`     | Date       | Original publishing date |
| `rawDataUrl`*     | **string** | Location of raw feed content (e.g. JSON/HTML), this is typically an S3 location (e.g. `s3://raw-storage/2017/08/01/raw-article.json`) |
| `sourceUrl`*      | **string** | URL of the publication source (e.g. `https://newsapi.org/v1/articles?source=the-wall-street-journal`) |
| `text`            | string     | Plaintext format of the article body |
| `title`*          | **string** | Title article was published as |

#### `client.articles.list({ type?, importanceScoreMin?, keyTerm?, linkHash?, publishedAfter?, publishedBefore?, limit?, offset? })`

#### `client.articles.create(obj)`

Takes all an object with the model attributes

#### `client.articles.get(id)`

#### `client.articles.update(obj)`

Takes all an object with the model attributes

#### `client.articles.destroy(id)`

### ArticleHighlights

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `articleId`* | **string** | Article being highlighted |
| `body`*      | **string** | Phrases that should be highlighted |
| `userId`*    | **string** | User the highlights apply to |

#### `client.articleHighlights.list({ articleId?, linkHash?, userId?, limit?, offset? })`

**NOTE:** `linkHash` is MD5 hash of the article URL

#### `client.articleHighlights.create(obj)`

Takes all an object with the model attributes

#### `client.articleHighlights.get(id)`

#### `client.articleHighlights.update(obj)`

Takes all an object with the model attributes

#### `client.articleHighlights.destroy(id)`

### ArticleKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `articleId`* | **string** | Article identifier |
| `term`*      | **string** | Key term in article |

#### `client.articleKeyTerms.list({ articleId, limit?, offset? })`

#### `client.articleKeyTerms.create({ articleId, term })`

#### `client.articleKeyTerms.get({ articleId, term })`

#### `client.articleKeyTerms.destroy({ articleId, term })`

### Company

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`    | string     | Resource ID **Cannot be edited** |
| `name`* | **string** | Primary company name (others can be associated as key terms) |

#### `client.companies.list({ limit?, offset? })`

#### `client.companies.create(obj)`

Takes all an object with the model attributes

#### `client.companies.get(id)`

#### `client.companies.update(obj)`

Takes all an object with the model attributes

#### `client.companies.destroy(id)`

### CompanyKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `companyId`* | **string** | Associated company |
| `term`*      | **string** | Term (can be word or phrase) to find in articles |

#### `client.companyKeyTerm.list({ companyId?, limit?, offset? })`

#### `client.companyKeyTerm.create(obj)`

Takes all an object with the model attributes

#### `client.companyKeyTerm.get(term)`

#### `client.companyKeyTerm.destroy(term)`

### Domain

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `companyId`* | **string** | Associated company |
| `hostname`*  | **string** | FQDN e.g. `api.hud.ai` |

#### `client.domains.list({ companyId?, hostname?, limit?, offset? })`

#### `client.domains.create(obj)`

Takes all an object with the model attributes

#### `client.domains.get(id)`

#### `client.domains.update(obj)`

Takes all an object with the model attributes

#### `client.domains.destroy(id)`

### KeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `term`* | **string** | Term (can be word or phrase) to find in articles |

#### `client.keyTerms.list({ limit?, offset? })`

#### `client.keyTerms.create(obj)`

Takes all an object with the model attributes

#### `client.keyTerms.get(term)`

#### `client.keyTerms.destroy(term)`

### RelevantArticle

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                 | string     | Resource ID **Cannot be edited** |
| `articleId`*         | **string** | Scored article |
| `articlePublishedAt` | **Date**   | When scored article was published |
| `score`*             | **Float**  | Score between 0 and 1 |
| `scoredAt`*          | **Date**   | When the scoring was performed |
| `userId`*            | **string** | User the score applies to |

#### `client.relevantArticles.list({ articleId?, userId?, scoredAbove?, scoredBelow?, scoredBefore?, scoredAfter?, publishedBefore?, publishedAfter?, limit?, offset? })`

#### `client.relevantArticles.create(obj)`

Takes all an object with the model attributes

**NOTE:** Multiple RelevantArticles *cannot* be created with the same `userId`
and `article_id`

#### `client.relevantArticles.get(id)`

#### `client.relevantArticles.update(obj)`

Only the `score` and `scoredAt` and `articlePublishedAt` can be updated.

#### `client.relevantArticles.destroy(id)`

### TextCorpus

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`      | string     | Resource ID **Cannot be edited** |
| `body`*   | **string** | Text blob to use for relevance matching |
| `type`*   | **string** | Text origin e.g. `email` or `manual` |
| `userId`* | **string** | User the corpus is used to identify articles for |

#### `client.textCorpora.list({ corpus_type?, userId?, limit?, offset? })`

#### `client.textCorpora.create(obj)`

Takes all an object with the model attributes

#### `client.textCorpora.get(id)`

#### `client.textCorpora.update(obj)`

Takes all an object with the model attributes

#### `client.textCorpora.destroy(id)`

### User

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`       | string     | Resource ID **Cannot be edited** |
| `email`*   | **string** | Primary email address for updates/notifications |
| `name`*    | **string** | User's full name (used in emails and other communications) |
| `timeZone` | string     | [tz database][tz-database-link] time zone used to determine when to send notifications (defaults to `America/New_York`) |

#### `client.users.list({ email?, digestSubscriptionDay?, digestSubscriptionHour?, name?, keyTerm?, limit?, offset? })`

#### `client.users.create(obj)`

Takes all an object with the model attributes

#### `client.users.get(id)`

#### `client.users.update(obj)`

Takes all an object with the model attributes

#### `client.users.destroy(id)`

### UserCompany

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `companyId`* | **string** | Associated company |
| `userId`*    | **string** | Associated user |

#### `client.userCompanies.list({ companyId?, userId?, limit?, offset? })`

#### `client.userCompanies.create(obj)`

Takes all an object with the model attributes

#### `client.userCompanies.get(id)`

#### `client.userCompanies.destroy(id)`

### UserDigestSubscription

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `dayOfWeek`* | **string** | `sunday` \| `monday` \| `tuesday` \| `wednesday` \| `thursday` \| `friday` \| `saturday` |
| `isoHour`*   | **string** | 24-hour hour e.g. `08` = 8am, `17` = 5pm |
| `userId`*    | **string** | Associated user |

#### `client.userDigestSubscriptions.list({ userId, dayOfWeek?, isoHour?, limit?, offset? })`

#### `client.userDigestSubscriptions.create(obj)`

Takes all an object with the model attributes

#### `client.userDigestSubscriptions.get({ userId, id })`

#### `client.userDigestSubscriptions.destroy({ userId, id })`

### UserKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`      | string     | Resource ID **Cannot be edited** |
| `term`*   | **string** | Term (can be word or phrase) to find in articles |
| `userId`* | **string** | Associated user |

#### `client.userKeyTerms.list({ userId, limit?, offset? })`

#### `client.userKeyTerms.create({ userId, term })`

#### `client.userKeyTerms.get({ userId, term })`

#### `client.userKeyTerms.destroy({ userId, term })`

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
