const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
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
function encrypt(key, text) {
  // Creating Cipheriv with its parameter
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  const ivStr = iv.toString('hex');
  const encryptedData = encrypted.toString('hex');
  return `${encryptedData}:${ivStr}`;
}

module.exports = {
  isEmpty,
  mask,
  md5,
  encryptedWithPbkdf2,
  camelToSnakeCase,
  encrypt,
};
