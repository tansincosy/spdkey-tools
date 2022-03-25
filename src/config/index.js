const yaml = require('yaml');
const path = require('path');
const fs = require('fs');
const ymlFiles = path.resolve(__dirname, '../../config.yml');
const file = fs.readFileSync(ymlFiles, 'utf8');
module.exports = yaml.parse(file);
