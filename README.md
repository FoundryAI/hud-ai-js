# HUD.ai Javascript Client

[![Version][npm-version-badge]][npm-version-link]
[![Build Status][build-status-badge]][build-status-link]
[![Downloads][downloads-badge]][downloads-link]
[![Try on RunKit][runkit-badge]][runkit-link]

A JavaScript interface to the [Hud.ai API][hud-ai-docs-link]. To get started
install via npm:

```bash
npm install --save hud-ai
```

## Getting Started

First, you'll need to register a client application. This can currently only be
done by [reaching out to the engineering team](mailto:engineering@hud.ai).

### Single Page Apps

```js
const HudAi = require('hud-ai');

const client = HudAi.create({
  clientId: 'CLIENT_ID',
  redirectUri: 'http://www.example.com/oauth/callbacks/hud-ai'
});

// Send the user to the authorization URL, where they can choose to grant your
// app permissions to access the service on their behalf (if permission has
// already been given, they'll automatically be redirected)
window.location = client.getAuthorizeUri('token');

// token will be returned as the query param `authToken` to your redirect URL
const token = parseToken(window.location.search);
client.setBearerToken(token);
```

NOTE: The process of token retrieval will need to be performed again when the
token becomes invalid (they're currently valid for 24 hours).

### Server Applications

Because servers can be trusted to keep a secret, setup is much more
straightforward.

Client Authentication:

```js
const HudAi = require('hud-ai');

const client = HudAi.create({
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
});
```

Acting on behalf of a user:

```js
const redirectUrl = client.getAuthorizeUri('code');

// Send the user to the authorization URL, where they can choose to grant your
// app permissions to access the service on their behalf (if permission has
// already been given, they'll automatically be redirected)

// the code to exchange will be returned as the query param `code` to your
// redirect URL
const code = parseToken(window.location.search);
client.setAuthorizationCode(code);
```

### Additional Configuration

The client constructor accepts options for configuring your instance of the
lient. Here is where you can set things like strictSSL, API endpoints, and more.
See [config.ts][project-config-link] for a list of all supported properties.

## Basic Usage

```js
client.articles.get('SOME_ARTICLE_ID')
	.then(article => console.log(article))
	.catch(err => console.log('Got an error!', err));
```

[npm-version-badge]: https://img.shields.io/npm/v/hud-ai.svg
[npm-version-link]: https://www.npmjs.org/package/hud-ai
[build-status-badge]: https://travis-ci.org/FoundryAI/hud-ai-node.svg?branch=master
[build-status-link]: https://travis-ci.org/FoundryAI/hud-ai-node
[downloads-badge]: https://img.shields.io/npm/dm/hud-ai.svg
[downloads-link]: https://www.npmjs.com/package/hud-ai
[runkit-badge]: https://badge.runkitcdn.com/hud-ai.svg
[runkit-link]: https://runkit.com/npm/hud-ai-node

[hud-ai-docs-link]: https://docs.hud.ai
[project-config-link]: https://github.com/FoundryAI/hud-ai-node/blob/master/lib/util/ClientConfigFactory.ts#L16
