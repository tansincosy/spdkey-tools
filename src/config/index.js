module.exports = {
  port: 7001,
  accessTokenLifetime: 300,
  redis: {
    port: 6379,
    host: "127.0.0.1",
    family: 4,
  },
  log4j: {
    appenders: {
      console: {
        type: "console",
        layout: {
          type: "pattern",
          pattern: "%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c -%] %m",
        },
      },
      access: {
        type: "dateFile",
        filename: "./logs/tools.log",
        alwaysIncludePattern: true,
        pattern: "yyyyMMdd",
        daysToKeep: 60,
        numBackups: 3,
        keepFileExt: true,
        layout: {
          type: "pattern",
          pattern: "[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%c] - %m",
        },
      },
    },
    categories: {
      default: {
        appenders: ["access", "console"],
        level: "INFO",
      },
    },
  },
};
