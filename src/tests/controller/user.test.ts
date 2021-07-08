import { userRepository } from "../../repository/user.repository";
import * as chai from "chai";
import "mocha";
import { anyString, anything, spy, when } from "ts-mockito";
import { User } from "../../models/user";
import { Error } from "../../models/error";
import chaiHttp = require("chai-http");
import { server } from "../../server";
import { IUIErrorInfo } from "../../response/general";
import * as userResponse from "../data/user/users.json";
chai.use(chaiHttp);
chai.should();
let assert = chai.assert;
let expect = chai.expect;
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

describe("User Services MicroServices", () => {
  describe("Invalid device token", function () {
    this.beforeAll(async function () {
      let userRepo = spy(userRepository);
      let users = JSON.parse(JSON.stringify(userResponse));
      when(await userRepo.getAllUsers()).thenReturn({ users });
    });
    it("Get All User Details ", async () => {
      return chai
        .request(server)
        .get("/v0/users")
        .then(res => {
          expect(res).to.have.status(200);
          assert.equal(JSON.stringify(res.body), JSON.stringify(userResponse));
        });
    });
  });
});
