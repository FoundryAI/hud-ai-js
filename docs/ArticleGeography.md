# ArticleGeography

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `articleId`* | **string** | Article associated this geography |
| `geography`* | **string** | Geography (category) to associate with the article |

## `client.articleGeographies.list(params)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.geography`  | string |
| `query.limit`      | number |
| `query.offset`     | number |

## `client.articleGeographies.create(articleId, geography)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.geography`* | **string** |

## `client.articleGeographies.get(articleId, geography)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.geography`* | **string** |

## `client.articleGeographies.destroy(articleId, geography)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.geography`* | **string** |
