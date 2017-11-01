# KeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `term`*     | **string** | Term (can be word or phrase) to find in articles |

## `client.keyTerms.list(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.term`   | string |
| `params.limit`  | number |
| `params.offset` | number |

## `client.keyTerms.create(params)`

| Param | Type |
|-------|------|
| `params`       | Object |
| `params.term`* | **string** |

## `client.keyTerms.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.keyTerms.update(id, params)`

| Param | Type |
|-------|------|
| `id`          | string |
| `params`      | Object |
| `params.term` | string |

## `client.keyTerms.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
