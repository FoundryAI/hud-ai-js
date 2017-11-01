# CompanyKeyTerm

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | string     | Resource ID **Cannot be edited** |
| `companyId`* | **string** | Associated company |
| `description` | string | What the company does |
| `profileImageUrl` | string | Logo |
| `homepageUrl` | string | Marketing homepage |
| `linkedinUrl` | string | LinkedIn homepage |
| `city` | string | Headquarters city |
| `state` | string | Headquarters state |
| `country` | string | Headquarters country |

## `client.company_key_terms.getlist(params)`

| Param | Type |
|-------|------|
| `query`             | Object |
| `query.companyId`*  | **string** |
