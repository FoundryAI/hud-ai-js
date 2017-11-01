# User

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `email`*    | **String** | Primary email address for updates/notifications |
| `name`*     | **String** | User's full name (used in emails and other communications) |
| `time_zone` | String     | [tz database][tz-database-link] time zone used to determine when to send notifications (defaults to `America/New_York`) |

## `client.users.list(email?, digest_subscription_day?, digest_subscription_hour?, name?, key_term?, company_id?, page?)`

## `client.users.create(**params)`

Takes all of the model attributes as keyword params

## `client.users.get(id)`

## `client.users.me()`

## `client.users.update(id, **params)`

Takes all of the model attributes as keyword params

## `client.users.delete(id)`
