const log = require('../utils/log4j').getLogger('sync-db.middle');
const shell = require('shelljs');

module.exports = async (ctx, next) => {
  log.info('start sync db');
  const stdout = shell.exec('prisma db push');
  log.info('sync db success, stdout = ', stdout);
  await next();
};
