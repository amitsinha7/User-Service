import * as jwt from "jsonwebtoken";
import logger from "../config/logger.winston";
import { Context } from "koa";
import fs from "fs-extra";

const oauth = async (ctx: Context, next: Function) => {
  if (ctx.url === "/getJWTToken") {
    let token = jwt.sign({ body: "stuff" }, process.env.JWT_SECRET, { algorithm: "HS256" });
    ctx.body = token;
    ctx.status = 200;
    return ctx.body;
  }

  if (ctx.url === process.env.WHITELIST_URL && ctx.method === process.env.WHITELISTMETHOD) {
  } else if (ctx.header != null && ctx.header.authorization != null) {
    const token = ctx.header.authorization;
    jwt.decode(token, { complete: true });
    try {
      jwt.verify(token, process.env.JWT_SECRET, { complete: true });
    } catch (error) {
      logger.error(`Supplied token is expired!! Authorization server is UP to get a new/refresh token..`);
      ctx.status = 400;
      ctx.body = "Supplied token is expired!! Authorization server is UP to get a new/refresh token..";
      return ctx.body;
    }
  } else {
    logger.error(`Looks like Authorization server is UP!!! Please get a token to access the API..`);
    ctx.throw(400, "Looks like Authorization server is UP!!! Please get a token to access the API..");
  }
  return next().catch((err: { status: number }) => {
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
