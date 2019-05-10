# UserFeedSetting

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `userId`*    | **string** | Associated user |

## `client.userDigestSubscriptions.create(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.userId` | string |
| `params.recency`   | number |
| `params.showLocal`    | boolean |
| `params.showForeign`    | boolean |
| `params.companiesWeight`   | number |
| `params.peopleWeight`   | number |
| `params.interestsWeight`   | number |
| `params.sourcesWeight`   | number |
| `params.quotesWeight`   | number |
| `params.videosWeight`   | number |

## `client.userDigestSubscriptions.upsert(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.userId` | string |
| `params.recency`   | number |
| `params.showLocal`    | boolean |
| `params.showForeign`    | boolean |
| `params.companiesWeight`   | number |
| `params.peopleWeight`   | number |
| `params.interestsWeight`   | number |
| `params.sourcesWeight`   | number |
| `params.quotesWeight`   | number |
| `params.videosWeight`   | number |

## `client.userDigestSubscriptions.get(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.userId` | string |

## `client.userDigestSubscriptions.destroy(params)`

| Param | Type |
|-------|------|
| `params`        | Object |
| `params.userId` | string |
