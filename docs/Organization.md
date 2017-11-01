# Organization

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                       | string     | Resource ID **Cannot be edited** |
| `createdAt`                | Date       | Creation date **Cannot be edited** |
| `updatedAt`                | Date       | Last touch date **Cannot be edited** |
| `name`*                    | **string** | |
| `maxBillableAccounts`      | number     | |
| `emailDomain`*             | **string** | Users associated with this domain will be automatically connected |
| `signedLicenseAgreementAt` | Date       | _Cannot be backdated_ |
| `signupKey`                | string     | **Cannot be updated** |

## `client.organizations.list(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.name`        | string |
| `params.signupKey`   | string |
| `params.emailDomain` | string |

## `client.organizations.create(params)`

| Param | Type |
|-------|------|
| `params`                          | Object |
| `params.name`*                    | **string** |
| `params.maxBillableAccounts`      | number |
| `params.emailDomain`*             | **string** |
| `params.signedLicenseAgreementAt` | Date |
| `params.signupKey`                | string |

## `client.organizations.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.organizations.update(id, params)`

| Param | Type |
|-------|------|
| `id`                              | string |
| `params`                          | Object |
| `params.name`                     | string |
| `params.maxBillableAccounts`      | number |
| `params.emailDomain`              | string |
| `params.signedLicenseAgreementAt` | Date |

## `client.organizations.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
