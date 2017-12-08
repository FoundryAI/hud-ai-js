# Person

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`            | string     | Resource ID **Cannot be edited** |
| `createdAt`     | Date       | Creation date **Cannot be edited** |
| `updatedAt`     | Date       | Last touch date **Cannot be edited** |
| `name`*         | **string** | Full name |
| `title`*        | **string** | Professional title (e.g. `'Partner, Foundry.ai'`) |
| `imageUrl`      | string     | URL for a picture of the person |
| `linkedInUrl`   | string     | Full URL for the person's LinkedIn profile |
| `twitterHandle` | string     | Twitter handle (omitting `@`) |

## `client.people.list(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.name`   | string |
| `params.title`  | string |
| `params.term`   | string |
| `params.limit`  | number |
| `params.offset` | number |

## `client.people.create(params)`

| Param | Type |
|-------|------|
| `params`               | Object |
| `params.name`*         | **string** |
| `params.title`*        | **string** |
| `params.term`          | string |
| `params.linkedInUrl`   | string |
| `params.twitterHandle` | string |

## `client.people.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.people.update(id, params)`

| Param | Type |
|-------|------|
| `id`                   | string |
| `params`               | Object |
| `params.name`          | string |
| `params.title`         | string |
| `params.term`          | string |
| `params.linkedInUrl`   | string |
| `params.twitterHandle` | string |

## `client.people.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
