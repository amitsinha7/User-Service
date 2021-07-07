import * as jwt from "jsonwebtoken";
import logger from "../config/winston";
const oauth = async (ctx, next) => {
  if (ctx.header != null && ctx.header.authorization != null) {
    const token = ctx.header.authorization;
    jwt.decode(token, { complete: true });
    try {
      jwt.verify(token, process.env.auth_sign, { complete: true });
    } catch (error) {
      logger.error(`Supplied token is expired!! Authorization server is UP to get a new/refresh token..`);
      ctx.status = 400;
      ctx.body = "Supplied token is expired!! Authorization server is UP to get a new/refresh token..";
      return ctx.body;
    }
  } else if (ctx.header.host != null && (ctx.header.host === "inmarsatapi.flysas.com" || ctx.header.host === "inmarsatapi-staging.flysas.com")) {
    logger.info(`Request Host Header Without Authorization :: ${JSON.stringify(ctx.header.host)}`);
  } else if (ctx.header.host != null && ctx.header.host === "api-regression.flysas.com") {
    logger.info(`Request Host Header Without Authorization :: ${JSON.stringify(ctx.header.host)}`);
  } else {
    logger.error(`Looks like Authorization server is UP!!! Please get a token to access the API..`);
    ctx.throw(400, "Looks like Authorization server is UP!!! Please get a token to access the API..");
  }
  return next().catch(err => {
    logger.error(`Looks like Authorization server is UP!!! Please get a token to access the API.. :::: ${JSON.stringify(err)}`);
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "Looks like Authorization server is UP!!! Please get a token to access the API..";
    } else {
      throw err;
    }
  });
};
export { oauth };
