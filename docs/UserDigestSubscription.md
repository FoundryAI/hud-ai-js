# UserDigestSubscription

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`           | String     | Resource ID **Cannot be edited** |
| `day_of_week`* | **String** | `sunday` \| `monday` \| `tuesday` \| `wednesday` \| `thursday` \| `friday` \| `saturday` |
| `iso_hour`*    | **String** | 24-hour hour e.g. `08` = 8am, `17` = 5pm |
| `user_id`*     | **String** | Associated user |

## `client.user_digest_subscriptions.list(user_id, day_of_week?, iso_hour?, page?)`

## `client.user_digest_subscriptions.create(user_id, **params)`

Takes all of the model attributes as keyword params

## `client.user_digest_subscriptions.fetch(user_id, digest_id)`

## `client.user_digest_subscriptions.delete(user_id, digest_id)`
