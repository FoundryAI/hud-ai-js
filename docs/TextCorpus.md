# TextCorpus

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `body`*     | **String** | Text blob to use for relevance matching |
| `type`*     | **String** | Text origin (`manual`, `email`, `website`, or `linkedin`) |
| `userId`*   | **String** | User the corpus is used to identify articles for |

## `client.textCorpora.list(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.type`   | string |
| `params.userId` | string |
| `params.limit`  | number |
| `params.offset` | number |

## `client.textCorpora.create(params)`

| Param | Type |
|-------|------|
| `params`         | Object |
| `params.type`*   | **string** |
| `params.userId`* | **string** |
| `params.body`*   | **string** |

## `client.textCorpora.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.textCorpora.update(id, params)`

| Param | Type |
|-------|------|
| `id`            | string |
| `params`        | Object |
| `params.type`   | string |
| `params.userId` | string |
| `params.body`   | string |

## `client.textCorpora.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
