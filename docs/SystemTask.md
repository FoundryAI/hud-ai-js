# SystemTask

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`           | String     | Resource ID **Cannot be edited** |
| `task_id`*     | **String** | Task identifier (typically from `celery`) |
| `attempts`     | Number     | How many times has this job been started |
| `completed_at` | Date       | When the job finished (irregardless of success) |
| `started_at`   | Date       | Last time that the job was attempted |

## `client.system_tasks.list(completed?, started_after?, started_before?, task_id?, page?)`

## `client.system_tasks.create(**params)`

Takes all of the model attributes as keyword params

## `client.system_tasks.get(id)`

## `client.system_tasks.get_by_task_id(task_id)`

## `client.system_tasks.update(id, **params)`

Takes all of the model attributes as keyword params

## `client.system_tasks.mark_complete(id, completed_at?)`

When `completed_at` is omitted, it will default to now.

## `client.system_tasks.delete(id)`
