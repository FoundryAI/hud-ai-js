Hud.ai SDK for Node.js
===================

A JavaScript interface to the [Hud.ai API](https://docs.hud.ai). To get started install via npm:

```
npm install --save hud-ai-sdk
```

Basic Usage
-----------

```js
// Initialize SDK
const HudAiSDK = require('hud-ai-sdk');

const sdk = new HudAiSDK({
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
});

// Create a basic API client
const client = sdk.getBasicClient('USER_ACCESS_TOKEN');
// Get some
client.articles.get('SOME_ARTICLE_ID')
	.then(article => console.log(article))
	.catch(err => console.log('Got an error!', err));
```


Initializing the SDK
--------------------

The first thing you'll need to do is initialize the SDK with your client credentials. Client ID and secret are required, and the SDK will throw if they're not provided.

```js
const HudAiSDK = require('hud-ai-sdk');

const sdk = new HudAiSDK({
  clientID: 'CLIENT_ID', // required
  clientSecret: 'CLIENT_SECRET' // required
});
```

In addition, the SDK constructor accepts options for configuring your instance of the SDK. Here is where you can set things like strictSSL, API endpoints, and more. See [config.ts](https://github.com/FoundryAI/hud-ai-sdk/blob/master/lib/util/ClientConfigFactory.ts#L16) for a list of all supported properties.

OAuth2
------

### Getting Tokens

Acquires token info using your client credentials.

```js
sdk.getTokensClientCredentialsGrant()
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
sdk.getTokensRefreshGrant('ACCESS_TOKEN_OR_REFRESH_TOKEN')
.then((tokenInfo) => {  
	// ...
});
```

Creating API Clients
--------------------

Clients are used to communicate with the API on behalf of a user. All endpoints require some sort of authentication, which can be either as a user or an anonymous user via client credentials.

Hud.ai supports three different types of client:

- **Basic Client:** Simple, makes calls via the given access token
- **Persistent Client:** More advanced, will refresh its tokens as needed and persist them via some token store
- **App Auth Client:** Uses the app auth JWT grant to act on behalf of app-managed users. (COMING SOON)

### Basic Client

Returns a Hud.ai Client with a Basic API Session. The client is able to make requests on behalf of a user. A basic session has no access to a user's refresh token. Because of this, once the session's tokens expire the client cannot recover and a new session will need to be generated.

```js
const client = sdk.getBasicClient('ACCESS_TOKEN');
```

### Persistent Client

Returns a Hud.ai Client with a persistent API session. A persistent API session helps manage the user's tokens, and can refresh them automatically if the access token expires. If a central data-store is given, the session can read & write tokens to it.

```js
const client = sdk.getPersistentClient(tokenInfo[, tokenStore]);
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

- [Authentication](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/authentication.md)
- [Articles](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/articles.md)
- [Article Highlights](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/article-highlights.md)
- [Companies](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/companies.md)
- [Domains](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/domains.md)
- [Key Terms](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/key-terms.md)
- [Text Corpora](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/text-corpora.md)
- [Users](https://github.com/foundryAI/hud-ai-sdk/blob/master/docs/users.md)