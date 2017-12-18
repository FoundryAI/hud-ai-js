# Tweet

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`              | String     | Resource ID **Cannot be edited** |
| `createdAt`       | Date       | Creation date **Cannot be edited** |
| `updatedAt`       | Date       | Last touch date **Cannot be edited** |
| `personId`*       | **String** | Associated person |
| `twitterTweetId`* | **String** | Associated twitter tweet id |
| `text`*           | **String** | Content of the tweet |

## `client.tweets.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.personId`  | string |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.tweets.create(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.personId`*  | **string** |
| `params.twitterTweetId`* | **number** |
| `params.text`*      | **string** |

## `client.tweets.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.tweets.getByTwitterId(id)`

| Param | Type |
|-------|------|
| `id` | string |


## `client.tweets.destroy(params)`

| Param | Type |
|-------|------|
| `id` | string |
