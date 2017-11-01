# UserContact

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`           | String     | Resource ID **Cannot be edited** |
| `company_id`*  | **String** | Associated company |
| `user_id`*     | **String** | Associated user |
| `name`*        | **String** | Contact's name |
| `email`        | String     | Contact's email address |
| `phone_number` | String     | Contact's phone number |

## `client.user_contacts.list(user_id, company_id?, page?)`

## `client.user_contacts.create(user_id, company_id, **params)`

## `client.user_contacts.get(user_id, contact_id)`

## `client.user_contacts.update(user_id, contact_id, **params)`

## `client.user_contacts.destroy(user_id, contact_id)`
