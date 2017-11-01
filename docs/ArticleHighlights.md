# ArticleHighlights

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `articleId`* | **string** | Article being highlighted |
| `body`*      | **string** | Phrases that should be highlighted |
| `userId`*    | **string** | User the highlights apply to |

## `client.articleHighlights.list(query)`

| Param | Type |
|-------|------|
| `query`           | Object |
| `query.type`      | string |
| `query.articleId` | string |
| `query.linkHash`  | string |
| `query.userId`    | string |

## `client.articleHighlights.create(params)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.body`*      | **string** |
| `query.userId`*    | **string** |

## `client.articleHighlights.fetch(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.articleHighlights.update(id, params)`

| Param | Type |
|-------|------|
| `id`              | string |
| `query.articleId` | string |
| `query.body`      | string |
| `query.userId`    | string |

## `client.articleHighlights.delete(id)`

| Param | Type |
|-------|------|
| `id` | string |
