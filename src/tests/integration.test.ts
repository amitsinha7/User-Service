import { Connection, createConnection } from "typeorm";
import { server } from "../server";

const request = require("supertest");

describe("routes: /api/users", () => {
  describe("GET /users", () => {
    test("should return json", async () => {
      const response = await request(server).get("/v0/users");
      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      expect(response.body).toHaveLength(3);
    });
  });
});
