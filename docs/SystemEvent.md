# SystemEvent

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`       | String         | Resource ID **Cannot be edited** |
| `name`*    | **String**     | Event identifier e.g. `article.processed` |
| `payload`* | **Dictionary** | Event payload e.g. `{'location': 's3://my-bucket/file-path', type:'rss'}` |

## `client.system_events.list(page?)`

## `client.system_events.create(**params)`

Takes all of the model attributes as keyword params

## `client.system_events.get(id)`
