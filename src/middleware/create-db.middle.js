const { resolve } = require('path');
const log = require('../utils/log4j').getLogger('create-db.middle');
const { PRISMA_FILE_PATH } = require('../constant/constant');
const shell = require('shelljs');
const config = require('../config');

const main = async (ctx, next) => {
  const { db } = ctx.request.body;
  log.info('start set db url');
  const prismaDBUrl = `mysql://${db.user}:${db.password}@${db.host}:${db.port}/${db.dataBase}`;

  const sourceDir = resolve(process.cwd(), config.prisma.file_path);
  const targetDir = resolve(process.cwd(), PRISMA_FILE_PATH);

  log.info('start copy files', targetDir);

  if (!shell.test('-e', targetDir)) {
    log.warn(`${targetDir} is not found ,then create`);
    shell.mkdir('-p', targetDir);
  }

  shell.cp(sourceDir, targetDir);

  log.info('start replace db url');

  const editFile = resolve(targetDir, 'schema.prisma');

  log.info('start replace db url, editFile = ', editFile);

  shell.sed('-i', /env\("DATABASE_URL"\)/g, `"${prismaDBUrl}"`, editFile);

  log.info('set db url success');

  await next();
};

module.exports = main;
