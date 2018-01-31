# Industry

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `name`*      | **string** | Common name |
| `textCorpus` | string     | Unique words that would be used in that industry |

## `client.industries.list(query)`

| Param | Type |
|-------|------|
| `query`         | Object |
| `query.name`    | string |
| `query.limit`   | number |
| `query.offset`  | number |

## `client.industries.create(params)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.name`*      | **string** |
| `query.textCorpus` | string |

## `client.industries.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.industries.update(id, params)`

| Param | Type |
|-------|------|
| `id`                | string |
| `params`            | Object |
| `params.name`*      | string |
| `params.textCorpus` | string |

## `client.industries.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
