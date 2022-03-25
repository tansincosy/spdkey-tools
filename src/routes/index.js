const router = require('koa-router')();
const combineResponse = require('../utils/res');
const log = require('../utils/log4j').getLogger('router');

router.get('/', async (ctx, next) => {
  ctx.body = {
    version: '1.0.0',
    baseUrl: '/oauth',
    postUrl: 'https://oauth.lemonnard.com',
  };
});

router.post('/oauth/token', async (ctx) => {
  ctx.body = combineResponse(tokenObject);
});

router.get('/oauth/test', async (ctx, next) => {
  log.debug('[/oauth/secure_data]', result);
  ctx.body = 'test done!!';
});

module.exports = router;
