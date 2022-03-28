const fs = require('fs-extra');
const { resolve } = require('path');
const log = require('../utils/log4j').getLogger('create-db.middle');

const main = async (ctx, next) => {
  const { db } = ctx.request.body;
  log.info('start set db url');
  const prismaDBUrl = `mysql://${db.user}:${db.password}@${db.host}:${db.port}/${db.dataBase}`;

  const sourceDir = resolve(process.cwd(), 'demo');
  const targetDir = resolve(process.cwd(), 'prisma');

  log.info('start copy files');

  await fs.copy(sourceDir, targetDir).catch((error) => {
    log.error('error = ', error);
  });

  log.info('start replace db url');

  const editFile = resolve(targetDir, 'schema.prisma');

  log.info('start replace db url, editFile = ', editFile);

  let fileContent = await fs.readFile(editFile, 'utf8').catch((error) => {
    log.error('readFile = ', error);
  });

  fileContent = fileContent.replace(
    /env\("DATABASE_URL"\)/g,
    `"${prismaDBUrl}"`,
  );

  log.info('start replace db url  fileContent');
  await fs.writeFile(editFile, fileContent).catch((error) => {
    log.error('writeFile = ', error);
  });

  log.info('set db url success');

  next();
};

module.exports = main;
