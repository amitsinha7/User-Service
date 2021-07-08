import { Context } from "koa";
import { IUser, IUserRequestPo } from "../request/user.request";
import { IUIErrorInfos } from "../response/general";
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
    const userId = ctx.params.id;
    try {
      if (userId === undefined || userId === null || isNaN(userId * 1)) {
        logger.error(`Id Must be a number`);
        throw ERROR_MSG.USER_ID_NOT_VALID;
      } else {
        logger.info(`Getting User Details for User Id`);
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
  public async updateUser(ctx: Context) {
    logger.info(`To Update Existing User`);
    try {
      const userId = ctx.params.id;
      const userRequestPO: IUserRequestPo = JSON.parse(ctx.request.rawBody);
      if (userId === undefined || userId === null || isNaN(userId * 1)) {
        logger.error(`Id Must be a number`);
        throw ERROR_MSG.USER_ID_NOT_VALID;
      } else {
        userRequestPO.id = userId;
        let user: User = helper.mapUserRequest(userRequestPO);
        logger.info(`Mapping and validation completed ... Before DB Save : ${user.email}`);
        await userService.updateUser(user);
        ctx.body = "User Updated Successfully ";
        ctx.status = 201;
      }
    } catch (error) {
      logger.error(`Error While retrieving all users :  ${error}`);
      let uiError: IUIErrorInfos = await errorService.getUIError(error);
      ctx.body = uiError.errorInfos;
      ctx.status = uiError.httpStatusCode;
    }
  }
  public async deleteUser(ctx: Context) {
    logger.info(`To Delete Existing User`);
    try {
      const userId = ctx.params.id;
      if (userId === undefined || userId === null || isNaN(userId * 1)) {
        logger.error(`Id Must be a number`);
        throw ERROR_MSG.USER_ID_NOT_VALID;
      } else {
        logger.info(`Deleting User By Id Provided`);
        await userService.deleteUser(userId);
        ctx.body = "User Deleted Successfully ";
        ctx.status = 204;
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
