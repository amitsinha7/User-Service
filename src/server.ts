import * as bodyParser from "koa-bodyparser";
import * as Koa from "koa";
import logger from "./config/winston";
import { oauth } from "./middleware/oauth";
import { requsettracking } from "./middleware/requsettracking";
import { router } from "./config/routes";
const rTracer = require("cls-rtracer");

const app = new Koa();

app.use(oauth);

app.use(rTracer.koaMiddleware());
app.use(bodyParser());
app.use(requsettracking);
app.use(router.routes());

const server = app.listen(Number(process.env.PORT) || 3000).on("error", err => {
  logger.error(`Error At Starting Application on port ${err}`);
});
logger.info(`Started listening on port ${Number(process.env.PORT)}`);
export { server };
