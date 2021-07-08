import * as chai from "chai";
import "mocha";
import { anything, spy, when } from "ts-mockito";
import { User } from "../../src/models/user";
import { Error } from "../../src/models/error";
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
