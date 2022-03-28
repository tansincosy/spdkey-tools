const crypto = require('crypto');
const { resolve } = require('path');
const fs = require('fs-extra');
const yaml = require('yaml');
const { md5, encryptedWithPbkdf2, camelToSnakeCase } = require('../utils/tool');
const log = require('../utils/log4j').getLogger('create-crypto.middle');

const createEnvFile = async (appCrypto) => {
  let envContent = `
  # This is a configuration file,
  # the information in it will be used when the project is started,
  # please do not edit the file.
  # This file is generated with pre-service. \n`;
  envContent = envContent + yaml.stringify(appCrypto);
  const targetDir = resolve(process.cwd(), 'app_config');
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
};

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
  log.info('enter crypto middle');

  const access = md5(crypto.randomUUID());
  const refresh = md5(crypto.randomUUID());
  const tokenPass = await encryptedWithPbkdf2(crypto.randomUUID());
  let encryptedKey = await encryptedWithPbkdf2(access);
  let encryptedIv = await encryptedWithPbkdf2(refresh);

  encryptedKey = encryptedKey.substring(0, 32);
  encryptedIv = encryptedIv.substring(0, 32);

  const appCryptoObject = {
    crypto: {
      access,
      refresh,
      tokenPass,
      encryptedKey,
      encryptedIv,
    },
  };

  const appCrypto = toSnack(appCryptoObject);
  log.info('all crypto success ');
  await createEnvFile(appCrypto);

  log.info('create file success');

  next();
};
