# CompanyProfile

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`              | string     | Resource ID **Cannot be edited** |
| `createdAt`       | Date       | Creation date **Cannot be edited** |
| `updatedAt`       | Date       | Last touch date **Cannot be edited** |
| `companyId`*      | **string** | Associated company |
| `description`     | string     | What the company does |
| `profileImageUrl` | string     | Logo |
| `homepageUrl`     | string     | Marketing homepage |
| `linkedinUrl`     | string     | LinkedIn homepage |
| `city`            | string     | Headquarters city |
| `state`           | string     | Headquarters state |
| `country`         | string     | Headquarters country |

## `client.companyProfiles.get(params)`

| Param | Type |
|-------|------|
| `query`            | Object |
| `query.companyId`* | **string** |
