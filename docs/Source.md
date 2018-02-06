# Source

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | string     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `name`*     | **string** | Primary source name (others can be associated as key terms) |
| `domain`*    | **string**     | Source domain |
| `description`    | string     | Source description |
| `language`    | string     | Primary language of source |
| `country`    | string     | Primary country of source |
| `reliabilityScore`    | **number**     | How reliable the source is |

## `client.sources.list(query)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.name`    | string |
| `query.domain`  | string |
| `query.minReliability` | number |
| `query.maxReliability` | number |
| `query.articleId`  | string |
| `query.limit`   | number |
| `query.offset`  | number |

## `client.sources.create(params)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query`        | Object |
| `query.name`   | string |
| `query.domain`   | string |
| `query.country`   | string |
| `query.language`   | string |
| `query.reliabilityScore` | number |

## `client.sources.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.sources.update(id, params)`

| Param | Type |
|-------|------|
| `id`            | string |
| `params`        | Object |
| `params.name`   | string |
| `params.domain`   | string |
| `params.country`   | string |
| `params.language`   | string |
| `params.reliabilityScore` | number |

## `client.sources.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
