Hud.ai Client for Node.js
===================

A JavaScript interface to the [Hud.ai API](https://docs.hud.ai). To get started install via npm:

```
npm install --save hud-ai-node
```

Basic Usage
-----------

The first thing you'll need to do is initialize the client with your client credentials. Client ID and secret are required for server side applications, or you can provide your client ID and a redirect URI for client side applications.
```js
// Initialize the client
const HudAi = require('hud-ai-node');

// for server side applications
const client = HudAi.create({
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
}[, tokenStore]);

// for client side applications
const client = HudAi.create({
  clientId: 'CLIENT_ID',
  redirectUri: 'http://myapp.com'
});

// Get some
client.articles.get('SOME_ARTICLE_ID')
	.then(article => console.log(article))
	.catch(err => console.log('Got an error!', err));
```

In addition, the client constructor accepts options for configuring your instance of the client. Here is where you can set things like strictSSL, API endpoints, and more. See [config.ts](https://github.com/FoundryAI/hud-ai-node/blob/master/lib/util/ClientConfigFactory.ts#L16) for a list of all supported properties.

OAuth2
------

### Getting Tokens

Acquires token info using your client credentials.

```js
client.getTokensClientCredentialsGrant()
.then((tokenInfo) => {
	// tokenInfo: {
	//  accessToken: 'ACCESS_TOKEN',
	//  refreshToken: 'REFRESH_TOKEN',
	//  accessTokenAcquiredAtMS: 1464129218402,
	//  accessTokenTTLMS: 3600000,
	// }
});
```

### Refreshing Tokens

Refreshes the access and refresh tokens for a given refresh token.

```js
client.getTokensRefreshGrant('ACCESS_TOKEN_OR_REFRESH_TOKEN')
.then((tokenInfo) => {  
	// ...
});
```

#### Optional: Token Store

The token store is the interface used by persistent clients to interact with the consumer app's central storage layer. For a token store to be valid, it must have the following three methods which return a promise:

```js
store.read(); // read TokenInfo from app central store.
store.write(tokenInfo); // write TokenInfo to the app's central store.
store.clear(); // delete TokenInfo from the app's central store.
```

Notice that these methods don't pass in identifying information as arguments.

Accessing Data on Hud.ai
---------------------

### Resources

The following resources are supported by the SDK:

- [Authentication](https://github.com/foundryAI/hud-ai-node/blob/master/docs/authentication.md)
- [Articles](https://github.com/foundryAI/hud-ai-node/blob/master/docs/articles.md)
- [Article Highlights](https://github.com/foundryAI/hud-ai-node/blob/master/docs/article-highlights.md)
- [Companies](https://github.com/foundryAI/hud-ai-node/blob/master/docs/companies.md)
- [Domains](https://github.com/foundryAI/hud-ai-node/blob/master/docs/domains.md)
- [Key Terms](https://github.com/foundryAI/hud-ai-node/blob/master/docs/key-terms.md)
- [System Tasks](https://github.com/foundryAI/hud-ai-node/blob/master/docs/system-tasks.md)
- [Text Corpora](https://github.com/foundryAI/hud-ai-node/blob/master/docs/text-corpora.md)
- [Users](https://github.com/foundryAI/hud-ai-node/blob/master/docs/users.md)