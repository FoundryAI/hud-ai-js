# CompanyEvent

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | string     | Resource ID **Cannot be edited** |
| `createdAt`   | Date       | Creation date **Cannot be edited** |
| `updatedAt`   | Date       | Last touch date **Cannot be edited** |
| `title`*      | **string** | Name of the event for display/search purposes |
| `description` | string     | Term (can be word or phrase) to find in articles |
| `type`*       | **string** | Used for filtering (e.g. `earnings_call`) |
| `linkUrl`     | string     | Optional link to the event/more robust description |
| `startsAt`*   | **Date**   | When does this event start |
| `endsAt`*     | **Date**   | When does this event end |

## `client.companyEvents.list(params)`

| Param | Type |
|-------|------|
| `params`                | Object |
| `params.companyId`*     | **string** |
| `params.startingBefore` | Date |
| `params.startingAfter`  | Date |
| `params.endingBefore`   | Date |
| `params.endingAfter`    | Date |
| `params.occurringAt`    | Date |
| `params.title`          | string |
| `params.type`           | string |
| `params.limit`          | number |
| `params.offset`         | number |

## `client.companyEvents.create(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.title`*      | **string** |
| `params.description` | string |
| `params.type`*       | **string** |
| `params.linkUrl`     | string |
| `params.startsAt`*   | **Date** |
| `params.endsAt`*     | **Date** |

## `client.companyEvents.fetch(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.companyId`*  | **string** |
| `params.id`*         | **string** |

## `client.companyEvents.update(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.companyId`*  | **string** |
| `params.id`*         | **string** |
| `params.title`       | string |
| `params.description` | string |
| `params.type`        | string |
| `params.linkUrl`     | string |
| `params.startsAt`    | Date |
| `params.endsAt`      | Date |

## `client.companyEvents.destroy(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.companyId`*  | **string** |
| `params.id`*         | **string** |
