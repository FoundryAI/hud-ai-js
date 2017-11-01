# Person

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `createdAt` | Date       | Creation date **Cannot be edited** |
| `updatedAt` | Date       | Last touch date **Cannot be edited** |
| `name`*     | **String** | Full name |
| `title`*    | **String** | Professional title (e.g. `'Partner, Foundry.ai'`) |
| `imageUrl`  | String     | URL for a picture of the person |

## `client.people.list(params)`

| Param | Type |
|-------|------|
| `params`       | Object |
| `params.name`  | string |
| `params.title` | string |
| `params.term`  | string |

## `client.people.create(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params`        | Object |
| `params.name`*  | **string** |
| `params.title`* | **string** |
| `params.term`   | string |

## `client.people.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.people.update(id, params)`

| Param | Type |
|-------|------|
| `id`           | string |
| `params`       | Object |
| `params.name`  | string |
| `params.title` | string |
| `params.term`  | string |

## `client.people.delete(id)`

| Param | Type |
|-------|------|
| `id` | string |
