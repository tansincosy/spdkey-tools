const crypto = require('crypto');

const { md5, encryptedWithPbkdf2 } = require('../utils/tool');
const log = require('../utils/log4j').getLogger('create-crypto.middle');

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

  ctx.crypto = appCryptoObject.crypto;
  await next();
};
