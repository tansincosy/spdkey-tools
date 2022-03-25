const log = require("./log4j").getLogger("errorHandle");
const { isEmpty } = require("../utils/tool");

const errorDeal = (ctx, err) => {
  log.error("[errorHandle] error", err, "errorRequestUrl = ", ctx.request.url);
  let status = 400;
  ctx = {
    error_code: "LEMO.101000",
    error_message: "service is not available",
  };
  ctx.status = status;
  return ctx;
};

const errorHandle = async (ctx, next) => {
  let status = null;
  try {
    await next();
    status = ctx.status;
  } catch (err) {
    log.error("[errorHandle] error", err, "errorRequestUrl", ctx.request.url);
  }
  ctx.response.status = status;
};

module.exports = {
  errorHandle,
  errorDeal,
};
