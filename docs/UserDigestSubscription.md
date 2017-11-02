# UserDigestSubscription

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `dayOfWeek`* | **string** | `sunday` \| `monday` \| `tuesday` \| `wednesday` \| `thursday` \| `friday` \| `saturday` |
| `isoHour`*   | **string** | 24-hour hour e.g. `08` = 8am, `17` = 5pm |
| `userId`*    | **string** | Associated user |

## `client.userDigestSubscriptions.subscribe(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.dayOfWeek` | string |
| `params.isoHour`   | string |
| `params.userId`    | string |

## `client.userDigestSubscriptions.unsubscribe(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.dayOfWeek` | string |
| `params.userId`    | string |

## `client.userDigestSubscriptions.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.dayOfWeek` | string |
| `params.isoHour`   | string |
| `params.userId`    | string |

## `client.userDigestSubscriptions.create(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.dayOfWeek` | string |
| `params.isoHour`   | string |
| `params.userId`    | string |

## `client.userDigestSubscriptions.get(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.id`     | string |
| `params.userId` | string |

## `client.userDigestSubscriptions.destroy(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.id`     | string |
| `params.userId` | string |
