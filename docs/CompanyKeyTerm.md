# CompanyKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `createdAt`       | Date       | Creation date **Cannot be edited** |
| `updatedAt`       | Date       | Last touch date **Cannot be edited** |
| `companyId`* | **String** | Associated company |
| `term`*      | **String** | Term (can be word or phrase) to find in articles |

## `client.company_key_terms.list(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |

## `client.company_key_terms.create(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |

## `client.company_key_terms.get(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |

## `client.company_key_terms.delete(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
| `query.term`*       | **string** |
