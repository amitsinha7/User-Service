import { Context } from "koa";
import { IUser, IUserRequestPo } from "../request/user.request";
import { IErrorInfo, IUIErrorInfos } from "../response/general";
import logger from "../config/logger.winston";
import { userService } from "../services/user.services";
import { errorService } from "../services/error.services";
import { validator } from "../util/validator";
import { helper } from "../util/helper";
import { User } from "../models/user";
import { ERROR_MSG } from "../constants/user.constant";

class UserControllerV0 {
  public async getUsers(ctx: Context) {
    logger.info(`Entry To getUsers`);
    try {
      logger.info(`Before Getting all Users`);
      let users: IUser[] = await userService.getAllUserDetails();
      logger.info(`After Getting all Users`);
      ctx.body = users;
    } catch (error) {
      logger.error(`Error While retrieving all users :  ${error}`);
      let uiError: IUIErrorInfos = await errorService.getUIError(error);
      ctx.body = uiError.errorInfos;
      ctx.status = uiError.httpStatusCode;
    }
  }

  public async getUser(ctx: Context) {
    logger.info(`Entry To getUser`);
    try {
      const userId = ctx.params.id;
      logger.info(`Getting User Details for User Id ` + userId);
      if (isNaN(userId)) {
        logger.error(`Id Must be a Number` + userId);
        throw ERROR_MSG.USER_ID_NOT_VALID;
      } else {
        let user: IUser = await userService.getUserById(userId);
        logger.info(`After Getting all Users`);
        ctx.body = user;
      }
    } catch (error) {
      logger.error(`Error While retrieving all users :  ${error}`);
      let uiError: IUIErrorInfos = await errorService.getUIError(error);
      ctx.body = uiError.errorInfos;
      ctx.status = uiError.httpStatusCode;
    }
  }

  public async createUser(ctx: Context) {
    logger.info(`To Create New User`);
    try {
      const userRequestPO: IUserRequestPo = JSON.parse(ctx.request.rawBody);
      if (validator.validateUserRequest(userRequestPO)) {
        let user: User = helper.mapUserRequest(userRequestPO);
        logger.info(`Mapping and validation completed ... Before DB Save : ${user.email}`);
        let userSaved = await userService.createUser(user);
        let emailIdCreated = helper.mapUserResponse(userSaved);
        ctx.body = "New User Created with Email Id " + emailIdCreated;
        ctx.status = 201;
      }
    } catch (error) {
      logger.error(`Error While retrieving all users :  ${error}`);
      let uiError: IUIErrorInfos = await errorService.getUIError(error);
      ctx.body = uiError.errorInfos;
      ctx.status = uiError.httpStatusCode;
    }
  }
}
export const userControllerV0 = new UserControllerV0();
