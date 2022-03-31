const firstValidate = require('../schema/fist-login.schema');
const log = require('../utils/log4j').getLogger('params.middle');

module.exports = async (ctx, next) => {
  const valid = firstValidate(ctx.request.body);
  if (!valid) {
    log.error('first-login error, valid = ', firstValidate.errors);
    ctx.response.status = 400;
    ctx.body = {
      code: '400',
      message: '参数错误',
    };
    return;
  }
  await next();
};
