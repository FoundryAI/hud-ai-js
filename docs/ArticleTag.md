# ArticleTag

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `articleId`* | **string** | Article associated this tag |
| `tag`*       | **string**  | Tag (category) to associate with the article |

## `client.articleTags.list(params)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.tag`        | string |
| `query.limit`      | number |
| `query.offset`     | number |

## `client.articleTags.create(articleId, tag)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.tag`*       | **string** |

## `client.articleTags.get(articleId, tag)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.tag`*       | **string** |

## `client.articleTags.destroy(articleId, tag)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.tag`*       | **string** |
