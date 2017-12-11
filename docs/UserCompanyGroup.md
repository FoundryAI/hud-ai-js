# UserCompany

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `name`*     | **String** | Group identifier |
| `userId`*   | **String** | Associated user |

## `client.userCompanyGroups.list(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.userId` | string |
| `params.limit`  | number |
| `params.offset` | number |

## `client.userCompanyGroups.create(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.userId` | string |
| `params.name`*  | **string** |

## `client.userCompanyGroups.get(id)`

| Param | Type |
|-------|------|
| `id`* | **string** |

## `client.userCompanyGroups.destroy(id)`

| Param | Type |
|-------|------|
| `id`* | **string** |

## `client.userCompanyGroups.addCompany(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.id`*        | **string** |
| `params.companyId`* | **string** |


## `client.userCompanyGroups.removeCompany(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.id`*        | **string** |
| `params.companyId`* | **string** |
