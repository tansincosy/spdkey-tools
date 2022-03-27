const childProcess = require('child_process');
const path = require('path');
const util = require('util');
const log = require('../utils/log4j').getLogger('create-db.middle');
const main = async (ctx, next) => {
  const { db } = ctx.request.body;
  log.info('start set db url');

  const prismaDBUrl = `mysql://${db.user}:${db.password}@${db.host}:${db.port}/${db.dataBase}`;

  log.info('set db url success');
  const execResult = await util.promisify(childProcess.execFile)(
    path.relative(__dirname, '../../script/set_database_url.sh'),
    prismaDBUrl,
  );

  log.info('execResult >>>', execResult);
  next();
};

module.exports = main;
