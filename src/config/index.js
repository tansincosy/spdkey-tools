const yaml = require('yaml');
const path = require('path');
const fs = require('fs');
const ymlFiles = path.resolve(__dirname, '../../config.yml');

const { isEmpty } = require('../utils/tool');
let _cacheConfig = {};
function getConfig() {
  if (isEmpty(_cacheConfig)) {
    const file = fs.readFileSync(ymlFiles, 'utf8');
    const config = yaml.parse(file);
    _cacheConfig = config;
    return config;
  }
  return _cacheConfig;
}
module.exports = getConfig();
