# Article

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                  | string | Resource ID **Cannot be edited** |
| `createdAt`           | Date   | Creation date **Cannot be edited** |
| `updatedAt`           | Date   | Last touch date **Cannot be edited** |
| `organizationId`      | string | Organization that owns the collateral |
| `name`                | string | File name |
| `description`         | string | Additional user-readable metadata |
| `contentUrl`          | string | Location where the content has been uploaded (e.g. `https://uploads.hud.ai/organizations/org-id/collateral/upload.pdf`) |
| `plaintextUrl`        | string | Parsed `.txt` file containing content |
| `filetype`            | string | e.g. `pdf` or `application/msword` |
| `size`                | number | File size in bytes |
| `dataScienceMetadata` | Object | Here there be monsters, do not edit |

## `client.collateral.list(query)`

| Param | Type |
|-------|------|
| `query`                    | Object |
| `query.organizationId`*    | **string** |
| `query.id`                 | string |
| `query.name`               | string |
| `query.limit`              | number |
| `query.offset`             | number |

## `client.collateral.create(params)`

| Param | Type |
|-------|------|
| `params`                     | Object |
| `params.organizationId`*     | **string** |
| `params.name`*               | **string** |
| `params.contentUrl`*         | **string** |
| `params.description`         | string |
| `params.plaintextUrl`        | string |
| `params.filetype`            | string |
| `params.size`                | number |
| `params.dataScienceMetadata` | Object |

## `client.collateral.get(params)`

| Param | Type |
|-------|------|
| `params`                 | Object |
| `params.organizationId`* | **string** |
| `params.id`*             | **string** |

## `client.collateral.update(params)`

| Param | Type |
|-------|------|
| `params`                     | Object |
| `params.organizationId`*     | **string** |
| `params.id`*                 | **string** |
| `params.name`                | string |
| `params.contentUrl`          | string |
| `params.description`         | string |
| `params.plaintextUrl`        | string |
| `params.filetype`            | string |
| `params.size`                | number |
| `params.dataScienceMetadata` | Object |

## `client.collateral.destroy(params)`

| Param | Type |
|-------|------|
| `params`                 | Object |
| `params.organizationId`* | **string** |
| `params.id`*             | **string** |
