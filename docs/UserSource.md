# UserSource

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `sourceId`* | **String** | Associated source |
| `userId`*    | **String** | Associated user |
| `reliabilityScore`*    | **Number** | Associated user |

## `client.userSources.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.userId`    | string |
| `params.sourceId` | string |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.userSources.create(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.reliabilityScore`* | **string** |
| `params.sourceId`* | **string** |

## `client.userSources.update(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.reliabilityScore`* | **string** |
| `params.sourceId`* | **string** |

## `client.userSources.get(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.sourceId`* | **string** |

## `client.userSources.destroy(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.sourceId`* | **string** |
