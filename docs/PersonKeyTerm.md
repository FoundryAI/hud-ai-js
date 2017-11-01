# PersonKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `person_id`* | **String** | Related entity ID |
| `term`*      | **String** | Term (can be word or phrase) to find in articles |

## `client.person_key_terms.list(person_id, page?)`

## `client.person_key_terms.create(**params)`

Takes all of the model attributes as keyword params

## `client.person_key_terms.get(person_id, term)`

## `client.person_key_terms.delete(person_id, term)`
