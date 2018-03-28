# Company

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | string     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `name`*     | **string** | Primary company name (others can be associated as key terms) |
| `ticker`    | string     | Stock ticker (e.g. `"NASDAQ:TWTR"`) |

## `client.companies.list(query)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.name`    | string |
| `query.id`      | string |
| `query.keyTerm` | string |
| `query.ticker`  | string |
| `query.limit`   | number |
| `query.offset`  | number |

## `client.companies.search(query)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.name`    | string |
| `query.id`      | string |
| `query.limit`   | number |
| `query.offset`  | number |

## `client.companies.suggest(query)`

| Param | Type |
|-------|------|
| `query`         | string |

## `client.companies.availableData(ids)`

| Param | Type |
|-------|------|
| `ids` | **string \| string[]** |

## `client.companies.create(params)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.name`*   | **string** |
| `query.ticker`  | string |

## `client.companies.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.companies.update(id, params)`

| Param | Type |
|-------|------|
| `id`            | string |
| `params`        | Object |
| `params.name`   | string |
| `params.ticker` | string |

## `client.companies.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
