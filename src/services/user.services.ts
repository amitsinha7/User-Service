import { IUser } from "../request/user.request";
import logger from "../config/logger.winston";
import { userRepository } from "../repository/user.repository";
import * as _ from "lodash";
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
}

export const userService = new UserService();
