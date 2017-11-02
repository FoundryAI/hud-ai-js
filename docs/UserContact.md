# UserContact

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `createdAt`   | Date       | Creation date **Cannot be edited** |
| `updatedAt`   | Date       | Last touch date **Cannot be edited** |
| `companyId`*  | **String** | Associated company |
| `userId`*     | **String** | Associated user |
| `name`*       | **String** | Contact's name |
| `email`       | String     | Contact's email address |
| `phoneNumber` | String     | Contact's phone number |

## `client.userContacts.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.userId`    | string |
| `params.companyId` | string |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.userContacts.create(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.userId`      | string |
| `params.companyId`*  | **string** |
| `params.name`*       | **string** |
| `params.email`       | string |
| `params.phoneNumber` | string |

## `client.userContacts.get(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.companyId`* | **string** |

## `client.userContacts.update(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.userId`      | string |
| `params.companyId`*  | **string** |
| `params.name`        | string |
| `params.email`       | string |
| `params.phoneNumber` | string |

## `client.userContacts.destroy(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.userId`     | string |
| `params.companyId`* | **string** |
