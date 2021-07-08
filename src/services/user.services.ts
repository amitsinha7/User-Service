import { IUser, IUserRequest } from "../request/user.request";
import logger from "../config/logger.winston";
import { userRepository } from "../repository/user.repository";
import { User } from "../models/user";
class UserService {
  public async getAllUserDetails() {
    let userDetails: IUser[] = [];
    try {
      const result = await userRepository.getAllUsers();
      if (result !== null) {
        userDetails = JSON.parse(JSON.stringify(result));
      }
    } catch (error) {
      logger.error(`Error At getUserDetails : ${error}`);
      throw error;
    }
    return userDetails;
  }

  public async getUserById(id: number) {
    let user: IUser;
    try {
      const result = await userRepository.getUserById(id);
      if (result !== null) {
        user = JSON.parse(JSON.stringify(result));
      }
    } catch (error) {
      logger.error(`Error At getUserDetails : ${error}`);
      throw error;
    }
    return user;
  }

  public async createUser(user: User) {
    try {
      await userRepository.createUser(user);
    } catch (error) {
      logger.error(`Error At createUser in User Service : ${error}`);
      throw error;
    }
  }

  public async updateUser(user: User) {
    try {
      await userRepository.updateUser(user);
    } catch (error) {
      logger.error(`Error At updateUser in User Service : ${error}`);
      throw error;
    }
  }
  public async deleteUser(id: number) {
    try {
      await userRepository.deleteUser(id);
    } catch (error) {
      logger.error(`Error At deleteUser in User Service : ${error}`);
      throw error;
    }
  }
}

export const userService = new UserService();
