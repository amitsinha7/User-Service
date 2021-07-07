import logger from "../config/winston";
import { Context } from "koa";

const requsettracking = async (ctx: Context, next: Function) => {
  let startTime = new Date().getTime();
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

export { requsettracking };
