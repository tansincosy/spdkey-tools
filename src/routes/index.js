const router = require('koa-router')();
const config = require('../config');
const createCrypto = require('../middleware/create-crypto.middle');
const createDB = require('../middleware/create-db.middle');
const syncDB = require('../middleware/sync-db.middle');
const setTemp = require('../middleware/set-tmp-file.middle');
const params = require('../middleware/params.middle');

router.get('/', async (ctx, next) => {
  ctx.body = {
    version: '1.0.0',
    baseUrl: '/',
    appName: config.app.name || 'app',
  };
});

router.post(
  '/first-login',
  params,
  createCrypto,
  createDB,
  syncDB,
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
