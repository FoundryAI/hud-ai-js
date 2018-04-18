# Video

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`               | String         | Resource ID **Cannot be edited** |
| `createdAt`        | Date           | Date created |
| `updatedAt`        | Date           | Date updated |
| `title`*           | **String**     | Title of the video |
| `description`      | String         | Description of the video |
| `transcript`       | String         | Transcript of the video |
| `importanceScore`* | **Number**     | `hudai-importance-scorer` output |
| `posterUrl`        | String         | Poster preview image   |
| `videoUrl`*        | **String**     | Video url link for playing  |
| `publishedAt`*     | **Date**       | Original publishing date |
| `sourceId`         | String         | Source identifier |

## `client.videos.list(query)`

| Param | Type |
|-------|------|
| `query`                    | Object |
| `query.companyId`          | string |
| `query.personId`           | string |
| `query.source`             | string |
| `query.importanceScoreMin` | number |
| `query.publishedAfter`     | Date |
| `query.publishedBefore`    | Date |
| `query.limit`              | number |
| `query.offset`             | number |

## `client.videos.search(query)`

| Param | Type |
|-------|------|
| `query`                 | Object |
| `query.text`            | string |
| `query.companyId`       | string[] |
| `query.personId`        | string[] |
| `query.sourceId`        | string[] |
| `query.publishedBefore` | Date |
| `query.publishedAfter`  | Date |
| `query.createdBefore`   | Date |
| `query.createdAfter`    | Date |
| `query.maxImportance`   | number |
| `query.minImportance`   | number |
| `query.limit`           | number |
| `query.offset`          | number |

## `client.videos.create(params)`

| Param | Type |
|-------|------|
| `title`*           | **String**  |
| `description`      | String      |
| `transcript`       | String      |
| `importanceScore`* | **Number**  |
| `posterUrl`        | String      |
| `videoUrl`*        | **String**  |
| `publishedAt`*     | **Date**    |

## `client.videos.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.videos.update(id, params)`

| Param | Type |
|-------|------|
| `title`*           | String      |
| `description`      | String      |
| `transcript`       | String      |
| `importanceScore`  | Number      |
| `posterUrl`        | String      |
| `videoUrl`         | String      |
| `publishedAt`      | Date        |

## `client.videos.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
