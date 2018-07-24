# User

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                | string     | Resource ID **Cannot be edited** |
| `createdAt`         | Date       | Creation date **Cannot be edited** |
| `updatedAt`         | Date       | Last touch date **Cannot be edited** |
| `email`*            | **string** | Primary email address for updates/notifications |
| `name`*             | **string** | User's full name (used in emails and other communications) |
| `linkedinProfileId` | string     | Linked LinkedIn profile |
| `salesforceProfileId` | string     | Linked LinkedIn profile |
| `organizationId`    | string     | Organization (billable account) the user is a part of |

## `client.users.list(params)`

| Param | Type |
|-------|------|
| `params`                        | Object |
| `params.name`                   | string |
| `params.email`                  | string |
| `params.digestSubscriptionDay`  | string |
| `params.digestSubscriptionHour` | string |
| `params.keyTerm`                | string |
| `params.organizationId`         | string |
| `params.limit`                  | number |
| `params.offset`                 | number |

## `client.users.create(params)`

| Param | Type |
|-------|------|
| `params`                   | Object |
| `params.email`*            | **string** |
| `params.name`*             | **string** |
| `params.linkedinProfileId` | string |
| `params.salesforceProfileId` | string |
| `params.organizationId`    | string |

## `client.users.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.users.me()`

| Param | Type |
|-------|------|

## `client.users.update(id, params)`

| Param | Type |
|-------|------|
| `id`                       | string |
| `params`                   | Object |
| `params.email`             | string |
| `params.name`              | string |
| `params.linkedinProfileId` | string |
| `params.salesforceProfileId` | string |
| `params.organizationId`    | string |

## `client.users.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
