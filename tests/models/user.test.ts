import { expect } from "chai";
import { User } from "../../src/models/user";

test("user", () => {
  const user = new User();
  user.first_name = "Amit";
  user.email = "test.sinha@gmailtest.com";
  user.last_name = "test";
  expect(user.first_name).to.have("Amit");
  expect(user.last_name).to.have("test");
  expect(user.email).to.have("test.sinha@gmailtest.com");
});
