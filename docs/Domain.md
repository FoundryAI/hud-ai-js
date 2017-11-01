# Domain

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`          | String     | Resource ID **Cannot be edited** |
| `company_id`* | **String** | Associated company |
| `hostname`*   | **String** | FQDN e.g. `api.hud.ai` |

## `client.domains.list(company_id?, hostname?, page?)`

## `client.domains.create(**params)`

Takes all of the model attributes as keyword params

## `client.domains.fetch(id)`

## `client.domains.update(id, **params)`

Takes all of the model attributes as keyword params

## `client.domains.delete(id)`
