const router = require('koa-router')();
const config = require('../config');
const createCrypto = require('../middleware/create-crypto.middle');
const createDB = require('../middleware/create-db.middle');
const createSuperAdmin = require('../middleware/create-user.middle');
const syncDB = require('../middleware/sync-db.middle');

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

router.post(
  '/first-login',
  createCrypto,
  createDB,
  syncDB,
  createSuperAdmin,
  async (ctx) => {
    // const {
    //   user: { ...user },
    //   mail: { ...mail },
    //   db: { ...db },
    // } = ctx.request.body;

    // 升级数据库,添加初始用户表和权限，启动服务，并且测试主服务三次，如果主服务没有问题，执行关闭前置服务
    ctx.body = {};
  },
);

module.exports = router;
