const log = require('./log4j').getLogger('errorHandle');

const errorDeal = (ctx, err) => {
  log.error('[errorHandle] error', err, 'errorRequestUrl = ', ctx.request.url);
  const status = 400;
  ctx = {
    errorCode: 'SPD.101000',
    errorMessage: 'service is not available',
  };
  ctx.status = status;
  return ctx;
};

const errorHandle = async (ctx, next) => {
  let status = null;
  try {
    await next();
    status = ctx.status;
  } catch (err) {
    log.error('[errorHandle] error', err, 'errorRequestUrl', ctx.request.url);
  }
  ctx.response.status = status;
};

module.exports = {
  errorHandle,
  errorDeal,
};
