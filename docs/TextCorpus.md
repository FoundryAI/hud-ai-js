# TextCorpus

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `body`*     | **String** | Text blob to use for relevance matching |
| `type`*     | **String** | Text origin e.g. `email` or `email` |
| `user_id`*  | **String** | User the corpus is used to identify articles for |

## `client.text_corpora.list(corpus_type?, user_id?, page?)`

## `client.text_corpora.create(user_id?, corpus_type?, body?)`

## `client.text_corpora.get(id)`

## `client.text_corpora.update(id, user_id?, corpus_type?, body?)`

## `client.text_corpora.delete(id)`
