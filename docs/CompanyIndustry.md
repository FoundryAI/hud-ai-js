# CompanyIndustry

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `createdAt`   | Date       | Creation date **Cannot be edited** |
| `updatedAt`   | Date       | Last touch date **Cannot be edited** |
| `companyId`*  | **String** | Associated company |
| `industryId`* | **String** | Associated industry |

## `client.companyIndustries.list(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.industryId`* | **string** |
| `query.limit`       | number |
| `query.offset`      | number |

## `client.companyIndustries.create(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.industryId`* | **string** |

## `client.companyIndustries.get(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.industryId`* | **string** |

## `client.companyIndustries.destroy(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.industryId`* | **string** |
