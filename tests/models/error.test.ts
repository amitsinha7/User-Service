import { expect } from "chai";
import { Error } from "../../src/models/error";

test("error", () => {
  const error = new Error();
  error.businessContext = "user-services";
  error.errorCode = "9000034";
  error.errorMessage = "For Test Case";
  error.errorReference = "INFO";
  error.httpStatusCode = 200;
  error.severity = "3";

  expect(error.businessContext).to.have("user-services");
  expect(error.errorCode).to.have("9000034");
  expect(error.errorMessage).to.have("For Test Case");
  expect(error.errorReference).to.have("INFO");
  expect(String(error.httpStatusCode)).to.have("200");
  expect(error.severity).to.have("3");
});
