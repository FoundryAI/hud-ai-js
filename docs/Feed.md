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
| `params.keyTerms`               | Array |
| `params.minRelevance`           | number |
| `params.maxRelevance`           | number |
| `params.publishedBefore`        | Date |
| `params.publishedAfter`         | Date |
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
