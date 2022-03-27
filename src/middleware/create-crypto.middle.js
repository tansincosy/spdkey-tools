const crypto = require('crypto');

const { md5, encryptedWithPbkdf2 } = require('../utils/tool');

const log = require('../utils/log4j').getLogger('create-crypto.middle');
module.exports = async (ctx, next) => {
  log.info('enter crypto middle');

  const tokenAccess = md5(crypto.randomUUID());
  const tokenRefresh = md5(crypto.randomUUID());

  const tokenPass = await encryptedWithPbkdf2(crypto.randomUUID());
  let encryptedKey = await encryptedWithPbkdf2(tokenAccess);
  const encryptedIV = await encryptedWithPbkdf2(tokenRefresh);

  encryptedKey = encryptedKey.substring(0, 32);
  encryptedKey = encryptedIV.substring(0, 32);

  console.log(
    tokenAccess,
    '\n',
    tokenRefresh,
    '\n',
    tokenPass,
    '\n',
    encryptedKey,
    '\n',
    encryptedIV,
  );
  next();
};
