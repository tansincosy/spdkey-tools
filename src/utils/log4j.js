const log4js = require('log4js');
const config = require('../config');
const log4jConfig = {
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c -%] %m',
      },
    },
    access: {
      type: 'dateFile',
      filename: config.log.file,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] - %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['access', 'console'],
      level: config.log.level || 'info',
    },
  },
};

log4js.configure(log4jConfig);

module.exports = log4js;
