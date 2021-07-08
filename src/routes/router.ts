import Router from "koa-router";

import { userControllerV0 } from "../controller/userControllerV0";
const router = new Router();
// USER ROUTES
router.get("/v0/users", userControllerV0.getUsers);
router.post("/v0/users", userControllerV0.createUser);
router.get("/v0/users/:id", userControllerV0.getUser);
export { router };
