# UserKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `userId`*   | **String** | Associated user |
| `term`*     | **String** | Term (can be word or phrase) to find in articles |

## `client.userKeyTerms.list(params)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.userId`* | **string** |
| `query.term`*   | **string** |
| `query.limit`   | number |
| `query.offset`  | number |

## `client.userKeyTerms.create(params)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.userId`* | **string** |
| `query.term`*   | **string** |

## `client.userKeyTerms.get(params)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.userId`* | **string** |
| `query.term`*   | **string** |

## `client.userKeyTerms.destroy(params)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.userId`* | **string** |
| `query.term`*   | **string** |
