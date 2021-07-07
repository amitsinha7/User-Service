import "./config/env";
import bodyParser from "koa-bodyparser";

import Koa from "koa";
import logger from "./config/logger.winston";

import jwt from "koa-jwt";

import { request } from "./middleware/trace.http";

import { router } from "./routes/routes";

import helmet from "koa-helmet";
import cors from "@koa/cors";
import { createConnection } from "typeorm";

import "reflect-metadata";

const rTracer = require("cls-rtracer");

createConnection({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "user",
  password: process.env.POSTGRES_PASSWORD || "pass",
  database: process.env.POSTGRES_DATABASE || "apidb",
  entities: [process.env.DBENTITIESPATH]
})
  .then(async () => {
    const app = new Koa();

    // Provides important security headers to make your app more secure
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
          fontSrc: ["'self'", "fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "online.swagger.io", "validator.swagger.io"]
        }
      })
    );

    // Enable cors with default options
    app.use(cors());
    app.use(rTracer.koaMiddleware());
    app.use(bodyParser());
    app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/swagger-/] }));
    app.use(router.routes()).use(router.allowedMethods());
    app.use(request);
    app.listen(Number(process.env.PORT), () => {
      logger.info(`Server running on port ${Number(process.env.PORT)}`);
    });
  })
  .catch((error: string) => logger.error("TypeORM connection error: ", error));
