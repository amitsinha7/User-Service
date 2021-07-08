import "./config/env";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
import Koa from "koa";
import logger from "./config/logger.winston";

import { request } from "./middleware/trace.http";

import { router } from "./routes/router";

import helmet from "koa-helmet";
import cors from "@koa/cors";
import { createConnection } from "typeorm";

import "reflect-metadata";

import rTracer from "cls-rtracer";

import { oauth } from "./middleware/oauth";

const swagger = require("swagger-injector");

createConnection({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "user",
  password: process.env.POSTGRES_PASSWORD || "pass",
  database: process.env.POSTGRES_DATABASE || "apidb",
  entities: ["src/models/*.ts", "./build/src/models/*.js"],
  synchronize: true,
  logging: true
})
  .then(async () => {
    const app = new Koa();
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

    app.listen(Number(process.env.PORT), () => {
      logger.info(`Server running on port ${Number(process.env.PORT)}`);
    });
  })
  .catch((error: string) => logger.error("TypeORM connection error: ", error));
