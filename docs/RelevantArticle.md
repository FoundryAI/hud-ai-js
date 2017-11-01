# RelevantArticle

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`                   | String     | Resource ID **Cannot be edited** |
| `article_id`*          | **String** | Scored article |
| `user_id`*             | **String** | User the score applies to |
| `score`*               | **Float**  | Score between 0 and 1 |
| `scored_at`*           | **Date**   | When the scoring was performed |
| `article_published_at` | Date       | When scored article was published |

## `client.relevant_articles.list(article_id?, user_id?, scored_above?, scored_below?, scored_before?, scored_after?, published_before?, published_after?, page?)`

## `client.relevant_articles.create(**params)`

Takes all of the model attributes as keyword params.

**NOTE:** Multiple RelevantArticles *cannot* be created with the same `user_id`
and `article_id`

## `client.relevant_articles.get(id)`

## `client.relevant_articles.update(id, **params)`

Only the `score` and `scored_at` and `article_published_at` can be updated.

## `client.relevant_articles.delete(id)`
