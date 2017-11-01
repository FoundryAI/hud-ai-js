# CompanyKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `companyId`* | **String** | Associated company |
| `term`*      | **String** | Term (can be word or phrase) to find in articles |

## `client.companyKeyTerms.list(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |
| `query.limit`       | number |
| `query.offset`      | number |

## `client.companyKeyTerms.create(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |

## `client.companyKeyTerms.get(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |

## `client.companyKeyTerms.destroy(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |
