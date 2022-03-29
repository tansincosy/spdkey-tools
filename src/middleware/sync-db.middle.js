const childProcess = require('child_process');
const util = require('util');
const log = require('../utils/log4j').getLogger('sync-db.middle');

const execFile = util.promisify(childProcess.execFile);
module.exports = async (ctx, next) => {
  log.info('start sync db');
  const { stdout } =
    (await execFile('prisma', ['db', 'push']).catch((error) => {
      log.error('sync db error, error = ', error);
    })) || {};
  log.info('sync db success, stdout = ', stdout);

  log.info('start sync generate client');
  const result =
    (await execFile('prisma', ['generate']).catch((error) => {
      log.error('sync db error, error = ', error);
    })) || {};
  log.info('sync generate client, stdout = ', result.stdout);
  await next();
};
