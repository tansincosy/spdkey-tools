const router = require('koa-router')();
const config = require('../config');
const createCrypto = require('../middleware/create-crypto.middle');
const createDB = require('../middleware/create-db.middle');
const createSuperAdmin = require('../middleware/create-user.middle');
const syncDB = require('../middleware/sync-db.middle');
const setTemp = require('../middleware/set-tmp-file.middle');
const firstValidate = require('../schema/fist-login.schema');
const log = require('../utils/log4j').getLogger('router.js');

router.get('/', async (ctx, next) => {
  ctx.body = {
    version: '1.0.0',
    baseUrl: '/',
    appName: config.app.name || 'app',
  };
});

router.post(
  '/first-login',
  async (ctx, next) => {
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
  },
  createCrypto,
  createDB,
  syncDB,
  createSuperAdmin,
  setTemp,
  async (ctx, next) => {
    // 升级数据库,添加初始用户表和权限，启动服务，并且测试主服务三次，如果主服务没有问题，执行关闭前置服务
    await next();
    ctx.response.body = {
      message: '初始化成功',
      status: '200',
    };
  },
);

module.exports = router;
