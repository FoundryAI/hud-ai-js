# Quote

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `personId`*  | **String** | Associated person |
| `articleId`* | **String** | Associated person |
| `text`*      | **String** | Content of the quote |
| `importanceScore`| Number     | Tweet importance score |
| `term`*      | **String** | Term that caused the text to match |

## `client.quotes.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.personId`  | string |
| `params.articleId` | string |
| `params.term`      | string |
| `params.minImportance` | number |
| `params.maxImportance` | number |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.quotes.create(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.personId`*  | **string** |
| `params.articleId`* | **string** |
| `params.term`*      | **string** |
| `params.text`*      | **string** |
| `params.importanceScore`| number |

## `client.quotes.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.quotes.destroy(params)`

| Param | Type |
|-------|------|
| `id` | string |
