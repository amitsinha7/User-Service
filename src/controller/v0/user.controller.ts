import logger from "../../config/winston";

import { Context } from "koa";

class UserControllerV0 {
  public async getUsers() {
    logger.info(`Entry To getPassenger Wifi controller`);
    try {
    } catch (error) {
      logger.error(`getPassenger Error In Wifi controller : ${error}`);
    }
  }
}

export const userControllerV0 = new UserControllerV0();
