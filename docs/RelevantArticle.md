# RelevantArticle

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                 | string     | Resource ID **Cannot be edited** |
| `createdAt`          | Date       | Creation date **Cannot be edited** |
| `updatedAt`          | Date       | Last touch date **Cannot be edited** |
| `articleId`*         | **string** | Scored article |
| `userId`*            | **string** | User the score applies to |
| `score`*             | **number** | Score between 0 and 1 |
| `scoredAt`*          | **Date**   | When the scoring was performed |
| `articlePublishedAt` | Date       | When scored article was published |
| `keyTerms`           | string[]   | Terms that matched against the article |
| `tags`               | string[]   | Tags that the article fit (categories) |

## `client.relevantArticles.list(params)`

| Param | Type |
|-------|------|
| `params`                 | Object |
| `params.userId`          | string |
| `params.articleId`       | string |
| `params.publishedBefore` | Date |
| `params.publishedAfter`  | Date |
| `params.scoredAbove`     | number |
| `params.scoredBelow`     | number |
| `params.scoredBefore`    | Date |
| `params.scoredAfter`     | Date |
| `params.keyTerms`        | string[] |
| `params.tags`            | string[] |
| `params.include`         | string[] |

## `client.relevantArticles.create(params)`

| Param | Type |
|-------|------|
| `params`                    | Object |
| `params.articleId`*         | **string** |
| `params.userId`*            | **string** |
| `params.score`*             | **number** |
| `params.scoredAt`*          | **Date**   |
| `params.articlePublishedAt` | Date       |

## `client.relevantArticles.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.relevantArticles.update(id, params)`

| Param | Type |
|-------|------|
| `id`                        | string |
| `params`                    | Object |
| `params.articleId`          | string |
| `params.userId`             | string |
| `params.score`              | number |
| `params.scoredAt`           | Date |
| `params.articlePublishedAt` | Date |

## `client.relevantArticles.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
