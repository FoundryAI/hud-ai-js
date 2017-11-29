# UserTemplate

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `createdAt`   | Date       | Creation date **Cannot be edited** |
| `updatedAt`   | Date       | Last touch date **Cannot be edited** |
| `userId`*     | **String** | Associated user |
| `name`*       | **String** | Template's name |
| `markdown`*   | String     | Template markdown |

## `client.userTemplates.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.userId`    | string |
| `params.name`      | string |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.userTemplates.create(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.userId`      | string |
| `params.name`*       | **string** |
| `params.markdown`*   | **string** |

## `client.userTemplates.get(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.templateId`*| **string** |

## `client.userTemplates.update(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.userId`      | string |
| `params.companyId`*  | **string** |
| `params.name`        | string |
| `params.email`       | string |
| `params.phoneNumber` | string |

## `client.userTemplates.destroy(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.templateId`*| **string** |
