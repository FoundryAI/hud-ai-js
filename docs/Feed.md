# Feed

Returns a user's feed containing articles, quotes, videos.

## `client.feed.fetch(params)`

| Param | Type |
|-------|------|
| `params`                        | Object |
| `params.userId`                 | string |
| `params.text`                   | string |
| `params.tags`                   | Array |
| `params.geographies`            | Array |
| `params.types`                  | Array |
| `params.keyTerms`               | Array |
| `params.itemIds`                | Array |
| `params.companyIds`             | Array |
| `params.sourceIds`              | Array |
| `params.peopleIds`              | Array |
| `params.minImportance`          | number |
| `params.minLocal`               | number |
| `params.maxImportance`          | number |
| `params.maxLocal`               | number |
| `params.publishedBefore`        | Date |
| `params.publishedAfter`         | Date |
| `params.scoredBefore`           | Date |
| `params.scoredAfter`            | Date |
| `params.weights`                | Object |
| `params.weights.importance`     | number |
| `params.weights.article`     | number |
| `params.weights.tweet`     | number |
| `params.weights.stockAlert`     | number |
| `params.weights.video`     | number |
| `params.weights.quote`     | number |
| `params.weights.decay`     | number |
| `params.weights.decayOffset`     | string |
| `params.weights.decayScale`     | string |
| `params.weights.businessWord`     | number |
| `params.weights.industryTerm`     | number |
| `params.weights.jobFunctionTerm`     | number |
| `params.weights.corpusTerm`     | number |
| `params.weights.source`     | number |
| `params.weights.followedCompany`     | number |
| `params.weights.followedPerson`     | number |
| `params.limit`                  | number |
| `params.offset`                 | number |


## `client.feed.generateHeatmap(params)`

Returns an object of `{ term: { tag1: number }, term2: { tag1: number, tag2: number } }`

| Param | Type |
|-------|------|
| `query`                 | Object |
| `query.type`            | string |
| `query.text`            | string |
| `query.tags`            | string[] |
| `query.groupId`         | string |
| `query.publishedBefore` | Date |
| `query.publishedAfter`  | Date |
| `query.createdBefore`   | Date |
| `query.createdAfter`    | Date |
| `query.maxImportance`   | number |
| `query.minImportance`   | number |
| `query.maxLocal`   | number |
| `query.minLocal`   | number |
| `query.limit`           | number |
| `query.offset`          | number |
| `query.scoredBefore`    | Date |
| `query.scoredAfter`     | Date |
