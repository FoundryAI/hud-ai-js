# RelevantArticleCollateral

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                 | String     | Resource ID **Cannot be edited** |
| `createdAt`          | Date       | Creation date **Cannot be edited** |
| `updatedAt`          | Date       | Last touch date **Cannot be edited** |
| `collateralId`*      | **String** | Associated Collateral |
| `relevantArticleId`* | **String** | Associated RelevantArticle |

## `client.relevantArticleCollateral.list(params)`

| Param | Type |
|-------|------|
| `params`                    | Object |
| `params.relevantArticleId`* | **string** |
| `params.collateralId`       | **string** |
| `params.limit`              | number |
| `params.offset`             | number |

## `client.relevantArticleCollateral.create(params)`

| Param | Type |
|-------|------|
| `params`                    | Object |
| `params.relevantArticleId`* | **string** |
| `params.collateralId`*      | **string** |

## `client.relevantArticleCollateral.get(params)`

| Param | Type |
|-------|------|
| `params`                    | Object |
| `params.relevantArticleId`* | **string** |
| `params.collateralId`*      | **string** |

## `client.relevantArticleCollateral.destroy(params)`

| Param | Type |
|-------|------|
| `params`                    | Object |
| `params.relevantArticleId`* | **string** |
| `params.collateralId`*      | **string** |
