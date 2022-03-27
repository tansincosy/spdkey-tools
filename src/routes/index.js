const router = require('koa-router')();
const config = require('../config');
const createCrypto = require('../middleware/create-crypto.middle');
router.get('/', async (ctx, next) => {
  ctx.body = {
    version: '1.0.0',
    baseUrl: '/',
    appName: config.app.name || 'app',
  };
});

/**
 * 设置用户名
 * 设置密码
 * 设置邮箱
 * 主邮箱
 * 设置🔗的数据库
 * 
 * 初始化数据库
 * 
 * 
 * token_access=7jWGaGgMxAKy6IaphwHopuPMqSq3EXSz
  token_refresh=zlIgZjw8NlHOjD6O6ekYZ793mJxBpz3B
  token_pass=EMH#!Xj7aPaEyE4RVg4aOsUB^r%H0R4DVT89hzE4*kSU@FdU&6myuP8AorQ7dmVs7IJslDljtv@#e#J%g0yQ5F9a%&X%iPkr%9%
  encrypted_key=2A9ul1is8Fiu2BC4D20p7Bxgkqo9n4cj
  encrypted_iv=v8bE3xv5owoA116yB4E0svn88Bn4xm3g
 *
  mail_host=smtp.qq.com
  mail_port=465
  mail_secure=true
  mail_auth_user=stupidonkey@foxmail.com
  mail_auth_pass=
  mail_target_host_name=http://localhost:3000
 * 
 * 
 * 启动主应用
 * 
 */

router.get('/test', async (ctx) => {
  ctx.body = 'done';
});

router.post('/first-login', createCrypto, async (ctx) => {
  // const {
  //   user: { ...user },
  //   mail: { ...mail },
  //   db: { ...db },
  // } = ctx.request.body;

  // 升级数据库,添加初始用户表和权限，启动服务，并且测试主服务三次，如果主服务没有问题，执行关闭前置服务
  ctx.body = {};
});

module.exports = router;
