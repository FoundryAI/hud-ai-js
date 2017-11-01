# PersonQuote

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `article_id`* | **String** | Related entity ID |
| `term`*       | **String** | Term (can be word or phrase) to find in articles |
| `text`*       | **String** | Section of the article containing the quote (e.g. surrounding paragraph) |

## `client.person_quotes.list(person_id, article_id?, term?, page?)`

## `client.person_quotes.create(**params)`

Takes all of the model attributes as keyword params

## `client.person_quotes.fetch(person_id, quote_id)`

## `client.person_quotes.update(person_id, quote_id)`

Takes all of the model attributes as keyword params

## `client.person_quotes.delete(person_id, quote_id)`
