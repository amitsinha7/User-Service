import { SwaggerRouter } from "koa-swagger-decorator";

const router = new SwaggerRouter();

import { userControllerV0 } from "../controller/userControllerV0";

router.prefix("/api");

// USER ROUTES
router.get("v0/users", userControllerV0.getUsers);
router.get("v0/users/:id", userControllerV0.getUser);
router.post("v0/users", userControllerV0.createUser);
router.put("v0/users/:id", userControllerV0.updateUser);
router.delete("v0/users/:id", userControllerV0.deleteUser);
router.delete("v0/testusers", userControllerV0.deleteTestUsers);

// Swagger endpoint
router.swagger({
  title: "User Service",
  description: "User Services.",
  version: "1.0.0"
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(__dirname);

export { router };
