# Article

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`              | string     | Resource ID **Cannot be edited** |
| `createdAt`       | Date       | Creation date **Cannot be edited** |
| `updatedAt`       | Date       | Last touch date **Cannot be edited** |
| `imageUrl`        | string     | Image published in the article's metadata |
| `importanceScore` | number     | `hudai-importance-scorer` output |
| `linkHash`        | string     | MD5 hash of the `linkUrl` **Cannot be edited** |
| `linkUrl`*        | **string** | Where the article was originally published (e.g. `https://www.nytimes.com/2017/08/01/world/middleeast/mosul-isis-survivors-rights.html`) |
| `publishedAt`     | Date       | Original publishing date |
| `rawDataUrl`*     | **string** | Location of raw feed content (e.g. JSON/HTML), this is typically an S3 location (e.g. `s3://raw-storage/2017/08/01/raw-article.json`) |
| `sourceUrl`*      | **string** | URL of the publication source (e.g. `https://newsapi.org/v1/articles?source=the-wall-street-journal`) |
| `text`            | string     | Plaintext format of the article body |
| `title`*          | **string** | Title article was published as |
| `groupId`*          | string | Optional group id |
| `type`*           | **string** | `rss` \| `newsApi` \| `facebook` \| `twitter` |

## `client.articles.list(query)`

| Param | Type |
|-------|------|
| `query`                    | Object |
| `query.type`               | string |
| `query.importanceScoreMin` | number |
| `query.keyTerm`            | string |
| `query.linkHash`           | string |
| `query.publishedAfter`     | Date |
| `query.publishedBefore`    | Date |
| `query.limit`              | number |
| `query.offset`             | number |

## `client.articles.create(params)`

| Param | Type |
|-------|------|
| `params`                 | Object |
| `params.imageUrl`        | string |
| `params.importanceScore` | number |
| `params.linkHash`        | string |
| `params.linkUrl`*        | **string** |
| `params.publishedAt`     | Date |
| `params.rawDataUrl`*     | **string** |
| `params.sourceUrl`*      | **string** |
| `params.text`            | string |
| `params.title`*          | **string** |
| `params.type`*           | **string** |

## `client.articles.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.articles.update(id, params)`

| Param | Type |
|-------|------|
| `id`                     | string |
| `params`                 | Object |
| `params.imageUrl`        | string |
| `params.importanceScore` | number |
| `params.linkHash`        | string |
| `params.linkUrl`         | string |
| `params.publishedAt`     | Date |
| `params.rawDataUrl`      | string |
| `params.sourceUrl`       | string |
| `params.text`            | string |
| `params.title`           | string |
| `params.type`            | string |

## `client.articles.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
