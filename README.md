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
const queryString = require('query-string');
const parsed = queryString.parse(location.search);
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
const queryString = require('query-string');
const parsed = queryString.parse(location.search);
client.setAuthorizationCode(parsed.code);
```

### Parameters

| Parameter | Usage | Example |
|-----------|-------|---------|
| `clientId`*    | Registered Client ID | `'46ef9d9b-89a9-4fd2-84cf-af6de31f2618'` |
| `clientSecret` | Registered Client Secret | `'59170c3e-e2c9-4244-92d8-c3595d4af325'` |
| `baseApiUrl`   | Specify an alternate server to request resources from | `'https://stage.api.hud.ai/v1'` |
| `baseAuthUrl`  | Specify an alternate server to request auth tokens from | `'https://stage.auth.hud.ai'` |
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
> - All `list` resources are paginated to 50/request, with `page` being 0-indexed (e.g. `page=3` will get you the fourth page)

### Article

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`               | String         | Resource ID **Cannot be edited** |
| `authors`          | list\<String\> | List of author names |
| `image_url`        | String         | Image published in the article's metadata |
| `importance_score` | Number         | `hudai-importance-scorer` output |
| `link_hash`        | String         | MD5 hash of the `link_url` **Cannot be edited** |
| `link_url`*        | **String**     | Where the article was originally published (e.g. `https://www.nytimes.com/2017/08/01/world/middleeast/mosul-isis-survivors-rights.html`) |
| `published_at`     | Date           | Original publishing date |
| `raw_data_url`*    | **String**     | Location of raw feed content (e.g. JSON/HTML), this is typically an S3 location (e.g. `s3://raw-storage/2017/08/01/raw-article.json`) |
| `source_url`*      | **String**     | URL of the publication source (e.g. `https://newsapi.org/v1/articles?source=the-wall-street-journal`) |
| `text`             | String         | Plaintext format of the article body |
| `title`*           | **String**     | Title article was published as |
| `article_type`*    | **String**     | `rss` \| `newsApi` \| `facebook` \| `twitter` |

#### `client.articles.list(article_type?, importance_score_min?, key_term?, link_hash?, page?, published_after?, published_before?)`

Example:

```python
last_week = datetime.datetime.now() - datetime.timedelta(days=7)

client.articles.list(article_type='rss', published_after=last_week)
```

#### `client.articles.create(**params)`

Takes all of the model attributes as keyword params (except `link_hash`)

#### `client.articles.fetch(id)`

#### `client.articles.update(id, **params)`

Takes all of the model attributes as keyword params (except `link_hash`)

#### `client.articles.delete(id)`

#### `client.articles.key_terms(id)`

Returns a list of key terms (`String`) associated with the article

### ArticleHighlights

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`             | String     | Resource ID **Cannot be edited** |
| `article_id`* | **String** | Article being highlighted |
| `body`*       | **String** | Phrases that should be highlighted |
| `user_id`*    | **String** | User the highlights apply to |

#### `client.article_highlights.list(article_id?, link_hash?, user_id?, page?)`

**NOTE:** `link_hash` is MD5 hash of the article URL

#### `client.article_highlights.create(**params)`

Takes all of the model attributes as keyword params

#### `client.article_highlights.fetch(id)`

#### `client.article_highlights.update(id, **params)`

Takes all of the model attributes as keyword params

#### `client.article_highlights.delete(id)`

### ArticleKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`             | String     | Resource ID **Cannot be edited** |
| `article_id`* | **String** | Article identifier |
| `term`*       | **String** | Key term in article |

#### `client.article_key_terms.list(article_id, page?)`

#### `client.article_key_terms.create(article_id, term)`

#### `client.article_key_terms.fetch(article_id, term)`

#### `client.article_key_terms.delete(article_id, term)`

### Company

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`       | String     | Resource ID **Cannot be edited** |
| `name`* | **String** | Primary company name (others can be associated as key terms) |

#### `client.companies.list(page?)`

#### `client.companies.create(**params)`

Takes all of the model attributes as keyword params

#### `client.companies.fetch(id)`

#### `client.companies.update(id, **params)`

Takes all of the model attributes as keyword params

#### `client.companies.delete(id)`

#### `client.companies.domains(id)`

Lists all `Domain`s (hostnames) associated with the company

#### `client.companies.key_terms(id)`

Lists all `KeyTerm`s associated with the company

### CompanyKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`             | String     | Resource ID **Cannot be edited** |
| `company_id`* | **String** | Associated company |
| `term`*       | **String** | Term (can be word or phrase) to find in articles |

#### `client.company_key_terms.list(company_id?, page?)`

#### `client.company_key_terms.create(**params)`

Takes all of the model attributes as keyword params

#### `client.company_key_terms.fetch(id)`

#### `client.company_key_terms.delete(id)`

### Domain

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`             | String     | Resource ID **Cannot be edited** |
| `company_id`* | **String** | Associated company |
| `hostname`*   | **String** | FQDN e.g. `api.hud.ai` |

#### `client.domains.list(company_id?, hostname?, page?)`

#### `client.domains.create(**params)`

Takes all of the model attributes as keyword params

#### `client.domains.fetch(id)`

#### `client.domains.update(id, **params)`

Takes all of the model attributes as keyword params

#### `client.domains.delete(id)`

### KeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `term`* | **String** | Term (can be word or phrase) to find in articles |

#### `client.key_terms.list(page?)`

#### `client.key_terms.create(**params)`

Takes all of the model attributes as keyword params

#### `client.key_terms.fetch(term)`

#### `client.key_terms.delete(term)`

### RelevantArticle

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`             | String     | Resource ID **Cannot be edited** |
| `article_id`* | **String** | Scored article |
| `user_id`*    | **String** | User the score applies to |
| `score`*      | **Float**  | Score between 0 and 1 |
| `scored_at`*  | **Date**   | When the scoring was performed |
| `article_published_at` | **Date** | When scored article was published |

#### `client.relevant_articles.list(article_id?, user_id?, scored_above?, scored_below?, scored_before?, scored_after?, published_before?, published_after?, page?)`

#### `client.relevant_articles.create(**params)`

Takes all of the model attributes as keyword params.

**NOTE:** Multiple RelevantArticles *cannot* be created with the same `user_id`
and `article_id`

#### `client.relevant_articles.fetch(id)`

#### `client.relevant_articles.update(id, **params)`

Only the `score` and `scored_at` and `article_published_at` can be updated.

#### `client.relevant_articles.delete(id)`

### SystemEvent

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String         | Resource ID **Cannot be edited** |
| `name`*    | **String**     | Event identifier e.g. `article.processed` |
| `payload`* | **Dictionary** | Event payload e.g. `{'location': 's3://my-bucket/file-path', type:'rss'}` |

#### `client.system_events.list(page?)`

#### `client.system_events.create(**params)`

Takes all of the model attributes as keyword params

#### `client.system_events.fetch(id)`

### SystemTask

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`           | String     | Resource ID **Cannot be edited** |
| `task_id`*  | **String** | Task identifier (typically from `celery`) |
| `attempts`     | Number     | How many times has this job been started |
| `completed_at` | Date       | When the job finished (irregardless of success) |
| `started_at`   | Date       | Last time that the job was attempted |

#### `client.system_tasks.list(completed?, started_after?, started_before?, task_id?, page?)`

#### `client.system_tasks.create(**params)`

Takes all of the model attributes as keyword params

#### `client.system_tasks.fetch(id)`

#### `client.system_tasks.fetch_by_task_id(task_id)`

#### `client.system_tasks.update(id, **params)`

Takes all of the model attributes as keyword params

#### `client.system_tasks.mark_complete(id, completed_at?)`

When `completed_at` is omitted, it will default to now.

#### `client.system_tasks.delete(id)`

### TextCorpus

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`           | String     | Resource ID **Cannot be edited** |
| `body`*     | **String** | Text blob to use for relevance matching |
| `type`*     | **String** | Text origin e.g. `email` or `custom` |
| `user_id`*  | **String** | User the corpus is used to identify articles for |

#### `client.text_corpora.list(corpus_type?, user_id?, page?)`

#### `client.text_corpora.create(user_id?, corpus_type?, body?)`

#### `client.text_corpora.fetch(id)`

#### `client.text_corpora.update(id, user_id?, corpus_type?, body?)`

#### `client.text_corpora.delete(id)`

### User

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `email`* | **String** | Primary email address for updates/notifications |
| `name`*  | **String** | User's full name (used in emails and other communications) |
| `time_zone` | String     | [tz database][tz-database-link] time zone used to determine when to send notifications (defaults to `America/New_York`) |

#### `client.users.list(email?, digest_subscription_day?, digest_subscription_hour?, name?, key_term?, page?)`

#### `client.users.create(**params)`

Takes all of the model attributes as keyword params

#### `client.users.fetch(id)`

#### `client.users.update(id, **params)`

Takes all of the model attributes as keyword params

#### `client.users.delete(id)`

### UserCompany

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`             | String     | Resource ID **Cannot be edited** |
| `company_id`* | **String** | Associated company |
| `user_id`*    | **String** | Associated user |

#### `client.user_companies.list(company_id?, user_id?, page?)`

#### `client.user_companies.create(**params)`

Takes all of the model attributes as keyword params

#### `client.user_companies.fetch(id)`

#### `client.user_companies.delete(id)`

### UserDigestSubscription

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`              | String     | Resource ID **Cannot be edited** |
| `day_of_week`* | **String** | `sunday` \| `monday` \| `tuesday` \| `wednesday` \| `thursday` \| `friday` \| `saturday` |
| `iso_hour`*    | **String** | 24-hour hour e.g. `08` = 8am, `17` = 5pm |
| `user_id`*     | **String** | Associated user |

#### `client.user_digest_subscriptions.list(user_id, day_of_week?, iso_hour?, page?)`

#### `client.user_digest_subscriptions.create(user_id, **params)`

Takes all of the model attributes as keyword params

#### `client.user_digest_subscriptions.fetch(user_id, digest_id)`

#### `client.user_digest_subscriptions.delete(user_id, digest_id)`

### UserKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `term`*    | **String** | Term (can be word or phrase) to find in articles |
| `user_id`* | **String** | Associated user |

#### `client.user_key_terms.list(user_id, page?)`

#### `client.user_key_terms.create(user_id, term)`

#### `client.user_key_terms.fetch(user_id, term)`

#### `client.user_key_terms.delete(user_id, term)`

[npm-version-badge]: https://img.shields.io/npm/v/hud-ai.svg
[npm-version-link]: https://www.npmjs.org/package/hud-ai
[build-status-badge]: https://travis-ci.org/FoundryAI/hud-ai-node.svg?branch=master
[build-status-link]: https://travis-ci.org/FoundryAI/hud-ai-node
[downloads-badge]: https://img.shields.io/npm/dm/hud-ai.svg
[downloads-link]: https://www.npmjs.com/package/hud-ai
[runkit-badge]: https://badge.runkitcdn.com/hud-ai.svg
[runkit-link]: https://runkit.com/npm/hud-ai-node

[axios-project-link]: https://github.com/mzabriskie/axios#request-config
[hud-ai-docs-link]: https://docs.hud.ai
[project-config-link]: https://github.com/FoundryAI/hud-ai-node/blob/master/lib/util/ClientConfigFactory.ts#L16
