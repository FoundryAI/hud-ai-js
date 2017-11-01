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
| `query`           | Object |
| `query.personId`* | **string** |
| `query.term`*     | **string** |

## `client.peopleKeyTerms.create(params)`

| Param | Type |
|-------|------|
| `query`           | Object |
| `query.personId`* | **string** |
| `query.term`*     | **string** |

## `client.peopleKeyTerms.get(params)`

| Param | Type |
|-------|------|
| `query`           | Object |
| `query.personId`* | **string** |
| `query.term`*     | **string** |

## `client.peopleKeyTerms.destroy(params)`

| Param | Type |
|-------|------|
| `query`           | Object |
| `query.personId`* | **string** |
| `query.term`*     | **string** |
