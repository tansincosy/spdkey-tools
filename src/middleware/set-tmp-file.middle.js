const { resolve } = require('path');
const fs = require('fs-extra');
const yaml = require('yaml');
const log = require('../utils/log4j').getLogger('set-tmp-file.middle');
const { camelToSnakeCase } = require('../utils/tool');
const { TMP_FILE_PATH, PRISMA_FILE_PATH } = require('../constant/constant');

const toSnack = (camelCaseObj) => {
  if (Object.prototype.toString.call(camelCaseObj) === '[object Object]') {
    return Object.keys(camelCaseObj).reduce((total, curKey) => {
      total[camelToSnakeCase(curKey)] = toSnack(camelCaseObj[curKey]);
      return total;
    }, {});
  }
  return camelCaseObj;
};

module.exports = async (ctx, next) => {
  const { crypto } = ctx;
  let envContent = `
# This is a configuration file,
# the information in it will be used when the project is started,
# please do not edit the file.
# This file is generated with pre-service. \n`;
  envContent = envContent + yaml.stringify(toSnack({ crypto }));
  const targetDir = resolve(process.cwd(), TMP_FILE_PATH);
  const isExist = fs.existsSync(targetDir);

  if (!isExist) {
    await fs.mkdir(targetDir).catch((error) => {
      log.error('error = ', error);
    });
  }
  await fs
    .writeFile(resolve(targetDir, 'config.yml'), envContent)
    .catch((error) => {
      log.error('write file error, error is =', error);
    });

  log.info('The written has the following contents');

  log.info('begin copy prisma file');

  await fs
    .copy(resolve(process.cwd(), PRISMA_FILE_PATH), targetDir)
    .catch((error) => {
      log.error('error = ', error);
    });

  log.info('empty the prisma file');
  await fs.emptyDir(resolve(process.cwd(), PRISMA_FILE_PATH));

  // todo: 拷贝文件到主体服务中，启动服务，清空临时文件夹，测试与主服务进度，关闭服务
  // 超级用户可以不创建，通过主服务的seed.js来创建

  await next();
};
