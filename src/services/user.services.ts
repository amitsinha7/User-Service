import { IUser, IUserRequest } from "../request/user.request";
import logger from "../config/logger.winston";
import { userRepository } from "../repository/user.repository";
import * as _ from "lodash";
import { User } from "../models/user";
class UserService {
  /**
   * Gets User details
   * @returns  Table data from User
   */
  public async getAllUserDetails() {
    let userDetails: IUser[] = [];
    try {
      const result = await userRepository.getAllUsers();
      if (!_.isEmpty(result)) {
        userDetails = JSON.parse(JSON.stringify(result));
      }
    } catch (error) {
      logger.error(`Error At getUserDetails : ${error}`);
      throw error;
    }
    return userDetails;
  }

  public async createUser(user: User) {
    let userDetail: IUser;
    try {
      const result = await userRepository.createUser(user);
      if (!_.isEmpty(result)) {
        userDetail = JSON.parse(JSON.stringify(result));
      }
    } catch (error) {
      logger.error(`Error At createUser in User Service : ${error}`);
      throw error;
    }
    return userDetail;
  }
}

export const userService = new UserService();
