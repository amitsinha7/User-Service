import * as Router from "koa-router";
const router = new Router();
import { userControllerV0 } from "../controller/v0/user.controller";
router.prefix("api/user-services/");
router.get("/v0/users", userControllerV0.getUsers);

export { router };
