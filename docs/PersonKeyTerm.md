# PersonKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `personId`* | **String** | Associated person |
| `term`*     | **String** | Term (can be word or phrase) to find in articles |

## `client.peopleKeyTerms.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.personId`* | **string** |
| `params.term`*     | **string** |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.peopleKeyTerms.create(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.personId`* | **string** |
| `params.term`*     | **string** |

## `client.peopleKeyTerms.get(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.personId`* | **string** |
| `params.term`*     | **string** |

## `client.peopleKeyTerms.destroy(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.personId`* | **string** |
| `params.term`*     | **string** |
