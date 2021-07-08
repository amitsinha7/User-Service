import { Context } from "koa";
import { IUser, IUserRequest, IUserRequestPo } from "../request/user.request";
import { IErrorInfo } from "../response/general";
import logger from "../config/logger.winston";
import { userService } from "../services/user.services";
import { errorService } from "../services/error.services";
import { validator } from "../util/validator";
import { IUserResponsePo } from "../response/user.response";
import { helper } from "../util/helper";
import { User } from "../models/user";

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

  public async createUser(ctx: Context) {
    let error: IErrorInfo = {} as IErrorInfo;
    logger.info(`To Create New User`);
    try {
      const userRequestPO: IUserRequestPo = JSON.parse(ctx.request.rawBody);
      if (validator.validateUserRequest(userRequestPO)) {
        let userResponse: IUserResponsePo = {} as IUserResponsePo;
        let user: User = helper.mapUserRequest(userRequestPO);
        logger.info(`Mapping and validation completed ... Before DB Save : ${user.email}`);
        let createdUser = await userService.createUser(user);
        ctx.body = helper.mapUserResponse(createdUser, userResponse);
      }
    } catch (error) {
      logger.error(`Error While retrieving all users :  ${error}`);
      ctx.body = await errorService.getUIError(error);
    }
  }
}
export const userControllerV0 = new UserControllerV0();
