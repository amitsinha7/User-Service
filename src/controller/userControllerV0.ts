import { Context } from "koa";
import { validate, ValidationError } from "class-validator";
import { IUser } from "../request/user.request";
import { IErrorInfo } from "../response/general";
import logger from "../config/logger.winston";
import { userService } from "../services/user.services";
import { errorService } from "../services/error.services";

class UserControllerV0 {
  public async getUsers(ctx: Context) {
    let error: IErrorInfo = {} as IErrorInfo;
    logger.info(`Entry To getUsers`);
    try {
      logger.info(`Before Getting all Users`);
      let users: IUser[] = await userService.getAllUserDetails();
      logger.info(`After Getting all Users`);
      ctx.body = users;
    } catch (error) {
      logger.error(`Error While retrieving all users :  ${error}`);
      ctx.body = await errorService.getUIError(error);
    }
  }
}

export const userControllerV0 = new UserControllerV0();
