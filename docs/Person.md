# Person

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`        | String     | Resource ID **Cannot be edited** |
| `name`*     | **String** | Full name |
| `title`*    | **String** | Professional title (e.g. `'Partner, Foundry.ai'`) |
| `image_url` | String     | URL for a picture of the person |

## `client.people.list(name?, title?, term?, page?)`

## `client.people.create(**params)`

Takes all of the model attributes as keyword params

## `client.people.fetch(person_id)`

## `client.people.update(person_id, **params)`

Takes all of the model attributes as keyword params

## `client.people.delete(person_id)`

## `client.people.quotes(pseron_id, page?)`

Convenience method
