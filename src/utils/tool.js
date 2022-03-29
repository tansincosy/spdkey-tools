const crypto = require('crypto');

const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;
const mask = (cc, num = 4, mask = '*') =>
  cc.slice(-num).padStart(cc.length, mask);

const md5 = (value) => {
  const md5Hash = crypto.createHash('md5');
  return md5Hash.update(value).digest('hex');
};

const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

function encryptedWithPbkdf2(userPassword) {
  // 盐值随机
  const salt = crypto.randomUUID();
  let primaryDriverKey = '';
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(userPassword, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        primaryDriverKey = '';
        reject(primaryDriverKey);
      } else {
        primaryDriverKey = derivedKey.toString('hex');
        resolve(primaryDriverKey);
      }
    });
  });
}

module.exports = {
  isEmpty,
  mask,
  md5,
  encryptedWithPbkdf2,
  camelToSnakeCase,
};
