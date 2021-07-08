import logger from "../config/logger.winston";
import { Context } from "koa";

/* eslint-disable */
const request = async (ctx: Context, next: Function) => {
  const startTime = new Date().getTime();
  if (ctx.request.rawBody != null) {
    logger.info(`${ctx.method} Method, Request Path :: ${ctx.path}  And Body :: ${ctx.request.rawBody}`);
  } else {
    logger.info(`${ctx.method} Method, Request Path :: ${ctx.path} And Query Params ::: ${JSON.stringify(ctx.query)}`);
  }
  await next();
  if (ctx.request.rawBody != null) {
    logger.info(`${ctx.method} Method, Request Path :: ${ctx.path} , Request Body Are :: ${ctx.request.rawBody} ,Response Body :: ${JSON.stringify(ctx.body)} And Time Taken :: ${new Date().getTime() - startTime} ms`);
  } else {
    logger.info(`${ctx.method} Method, Request Path :: ${ctx.path} Request Params Are ::: ${JSON.stringify(ctx.query)}, Response Body :: ${JSON.stringify(ctx.body)} And Time Taken :: ${new Date().getTime() - startTime} ms`);
  }
};

export { request };
