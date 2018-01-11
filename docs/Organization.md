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
| `ownerUserId`              | string       | Organization owner |
| `planId`                   | string     | **Cannot be edited (outside of cancelSubscription)** |
| `subscriptionId`                   | string     | **Cannot be edited (outside of cancelSubscription)** |
| `customerId`                   | string     | **Cannot be edited** |

## `client.organizations.list(params)`

| Param | Type |
|-------|------|
| `params`             | Object |
| `params.name`        | string |
| `params.planId`      | string |
| `params.emailDomain` | string |
| `params.ownerUserId` | string |
| `params.limit`       | number |
| `params.offset`      | number |

## `client.organizations.create(params)`

| Param | Type |
|-------|------|
| `params`                          | Object |
| `params.name`*                    | **string** |
| `params.maxBillableAccounts`      | number |
| `params.emailDomain`*             | **string** |
| `params.signedLicenseAgreementAt` | Date |
| `params.ownerUserId` | string |

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
| `params.ownerUserId` | string |

## `client.organizations.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.organizations.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.organizations.createSubscription(plan, source)`

| Param | Type |
|-------|------|
| `params.plan`*   | **string** |
| `params.source` | string |

## `client.organizations.cancelSubscription()`

| Param | Type |
|-------|------|

