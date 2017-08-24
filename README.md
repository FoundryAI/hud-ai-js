Hud.ai Client for Node.js
===================

[![Version](https://img.shields.io/npm/v/hud-ai-node.svg)](https://www.npmjs.org/package/hud-ai-node)
[![Build Status](https://travis-ci.org/FoundryAI/hud-ai-node.svg?branch=master)](https://travis-ci.org/FoundryAI/hud-ai-node)
[![Downloads](https://img.shields.io/npm/dm/hud-ai-node.svg)](https://www.npmjs.com/package/hud-ai-node)
[![Try on RunKit](https://badge.runkitcdn.com/hud-ai-node.svg)](https://runkit.com/npm/hud-ai-node)

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
});

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