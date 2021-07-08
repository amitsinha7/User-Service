import { IUserRequest, IUserRequestPo } from "../request/user.request";
import { ERROR_MSG } from "../constants/user.constant";
import logger from "../config/logger.winston";
import { IUserResponsePo } from "../response/user.response";
import { User } from "../models/user";

class Helper {
  public mapUserRequest(userRequestPO: IUserRequestPo) {
    logger.info(`In Helper and Mapping the UserRequest :: ${userRequestPO.email}`);
    const user: User = {} as User;

    try {
      if (userRequestPO.email != null) {
        user.email = String(userRequestPO.email);
      }
      if (userRequestPO.firstName != null) {
        user.first_name = String(userRequestPO.firstName);
      }
      if (userRequestPO.lastName != null) {
        user.last_name = String(userRequestPO.lastName);
      }
      if (userRequestPO.id != null) {
        user.id = Number(userRequestPO.id);
      }
    } catch (error) {
      logger.error(`Error While mapping the request :: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
    logger.info(`After Mapping Mapper Object as :: ${JSON.stringify(user)}`);
    return user;
  }

  public mapUserResponse(userRequest: IUserRequest) {
    logger.info(`In Helper and Mapping the UserRequest :: ${userRequest.email}`);

    const userResponePo: IUserResponsePo = {} as IUserResponsePo;
    try {
      if (userRequest.email != null) {
        userResponePo.email = userRequest.email;
      }
      if (userRequest.firstName != null) {
        userResponePo.firstName = userRequest.firstName;
      }
      if (userRequest.lastName != null) {
        userResponePo.lastName = userRequest.lastName;
      }
    } catch (error) {
      logger.error(`Error While mapping the response :: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
    logger.info(`After Mapping Response Object as :: ${JSON.stringify(userResponePo)}`);
    return userResponePo;
  }
}

export const helper = new Helper();
