# UserIndustry

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `createdAt`   | Date       | Creation date **Cannot be edited** |
| `updatedAt`   | Date       | Last touch date **Cannot be edited** |
| `userId`*     | **String** | Associated user |
| `industryId`* | **String** | Associated industry |

## `client.userKeyTerms.list(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.userId`*     | **string** |
| `query.industryId`* | **string** |
| `query.limit`       | number |
| `query.offset`      | number |

## `client.userKeyTerms.create(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.userId`*     | **string** |
| `query.industryId`* | **string** |

## `client.userKeyTerms.get(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.userId`*     | **string** |
| `query.industryId`* | **string** |

## `client.userKeyTerms.destroy(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.userId`*     | **string** |
| `query.industryId`* | **string** |
