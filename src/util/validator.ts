import { IUserRequestPo } from "../request/user.request";
import { ERROR_MSG } from "../constants/user.constant";
import logger from "../config/logger.winston";
import * as _ from "lodash";
class Validator {
  public validateUserRequest(userRequestPo: IUserRequestPo) {
    let isProceed = false;
    try {
      logger.info(`Validating User Request`);
      if (userRequestPo != null) {
        if (userRequestPo.firstName == null) {
          throw ERROR_MSG.FIRST_NAME_MISSING;
        } else if (userRequestPo.lastName == null) {
          throw ERROR_MSG.LAST_NAME_MISSING;
        } else if (userRequestPo.email == null) {
          throw ERROR_MSG.MISSING_EMAIL_ID;
        }
        isProceed = true;
      }
    } catch (error) {
      logger.error(`Error At validateUserRequest : ${error}`);
      throw error;
    }
    return isProceed;
  }
}
export const validator = new Validator();
