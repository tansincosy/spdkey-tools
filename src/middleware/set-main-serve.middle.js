const log = require('../utils/log4j').getLogger('set-main-serve.middle');
const shell = require('shelljs');
const { resolve } = require('path');
const { TMP_FILE_PATH } = require('../constant/constant');
const config = require('../config');

module.exports = async (ctx, next) => {
  shell.chmod(400, resolve(process.cwd(), TMP_FILE_PATH + '/*'));

  const targetDir = resolve(process.cwd(), config.prisma.file_path);
  const sourceDir = resolve(process.cwd(), TMP_FILE_PATH + 'schema.prisma');

  const appConfig = resolve(process.cwd(), TMP_FILE_PATH + 'app_config.yml');

  log.info('start copy files', targetDir);

  shell.cp(sourceDir, targetDir);

  shell.cp(appConfig, 'dist/*');

  log.info('start main server');
  shell.exec('node dist/main');
  await next();
};
