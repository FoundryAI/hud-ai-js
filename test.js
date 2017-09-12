const {HudAiClient} = require('./build/HudAiClient');
const client = HudAiClient.create({ clientId: 'ae66bc8d-77af-4ed8-b80f-f138ac0560f0', clientSecret: '983f0c9d-95c7-437b-8860-066aebed0ff5', baseApiUrl: 'http://local.api.hud.ai:3000/v1', baseAuthUrl: 'http://local.api.hud.ai:3000/v1/auth' });
client.refreshTokens();