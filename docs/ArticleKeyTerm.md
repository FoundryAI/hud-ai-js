# ArticleKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `articleId`* | **string** | Article associated with the key term |
| `term`*      | **string** | Key term in article |

## `client.articleKeyTerms.list(params)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.term`       | string |
| `query.limit`      | number |
| `query.offset`     | number |

## `client.articleKeyTerms.create(articleId, term)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.term`*      | **string** |

## `client.articleKeyTerms.get(articleId, term)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.term`*      | **string** |

## `client.articleKeyTerms.destroy(articleId, term)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.articleId`* | **string** |
| `query.term`*      | **string** |
