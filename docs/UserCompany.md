# UserCompany

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `companyId`* | **String** | Associated company |
| `userId`*    | **String** | Associated user |

## `client.userCompanies.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.userId`    | string |
| `params.companyId` | string |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.userCompanies.create(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.companyId`* | **string** |

## `client.userCompanies.get(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.companyId`* | **string** |

## `client.userCompanies.destroy(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.companyId`* | **string** |
