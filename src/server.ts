import "./config/env";
import bodyParser from "koa-bodyparser";
import Koa from "koa";
import logger from "./config/logger.winston";
import { request } from "./middleware/trace.http";
import { router } from "./routes/router";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import { createConnection } from "typeorm";
import * as path from "path";
import "reflect-metadata";

import rTracer from "cls-rtracer";

import { oauth } from "./middleware/oauth";

/* eslint-disable */
const swagger = require("swagger-injector");
import Boom from "@hapi/boom";

const app = new Koa();

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    // assuming _dirname is your project root
    path.resolve(__dirname + "/models/**/*.js")
  ]
})
  .then(async () => {})
  .catch((error: string) => logger.error("TypeORM connection error: ", error));

app.use(
  swagger.koa({
    path: `${__dirname}/swagger.json`,
    route: "/swagger"
  })
);
// Provides important security headers to make your app more secure
// https://helmetjs.github.io/
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" }
  })
);
app.use(cors());
app.use(rTracer.koaMiddleware());
app.use(bodyParser());
app.use(request);

app.use(oauth);

app.use(router.routes()).use(router.allowedMethods());
app.use(
  router.allowedMethods({
    throw: true,
    notImplemented: () => Boom.notImplemented(),
    methodNotAllowed: () => Boom.methodNotAllowed()
  })
);

const server = app.listen(Number(process.env.PORT)).on("error", err => {
  logger.error(`Error At Starting Application on port ${err}`);
});
logger.info(`Started listening on port ${Number(process.env.PORT)}`);

export { server };
