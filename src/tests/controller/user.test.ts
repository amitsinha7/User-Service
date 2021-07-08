import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { Response } from "superagent";

import { assert, expect, request } from "chai";
import { userRepository } from "../../repository/user.repository";

import { anyString, anything, spy, when } from "ts-mockito";
import { User } from "../../models/user";
import { Error } from "../../models/error";
import { server } from "../../server";
import { UserResponse } from "../data/user/users";
import * as errorData from "../data/tabledata/error.json";

const user: User = new User();
user.id = 0;
user.first_name = "Amit";
user.email = "test.sinha@gmailtest.com";
user.last_name = "test";

const error = new Error();
error.businessContext = "user-services";
error.errorCode = "9000034";
error.errorMessage = "For Test Case";
error.errorReference = "INFO";
error.httpStatusCode = 200;
error.severity = "3";

describe("UserControllerV)", () => {
  describe("Route GET /v0/users", () => {
    it("Should GET to /v0/users", async () => {
      const res: Response = await request("http://0.0.0.0:3000").get("/v0/users");
      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
    });
  });
});

describe("Invalid passenger request", function () {
  this.beforeAll(function () {
    const spyUserRepository = spy(userRepository);
    when(spyUserRepository.getAllUsers()).thenCall(function (code) {
      return errorData.find((e: { errorCode: any }) => e.errorCode === code);
    });
  });
  it("should return 200", async () => {
    return chai
      .request(server)
      .get("/v0/users")
      .then(res => {
        expect(res).to.have.status(200);
        assert.equal(JSON.stringify(res.body), JSON.stringify(UserResponse.getAllUsers));
      });
  });
});
