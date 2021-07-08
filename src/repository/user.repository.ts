import logger from "../config/logger.winston";
import { ERROR_MSG } from "../constants/user.constant";
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { User } from "../models/user";

class UserRepository {
  /**
   * Gets access details
   * @returns  Details of Access Table
   */
  public async getAllUsers() {
    let result: any;
    // get a user repository to perform operations with user
    const userRepository: Repository<User> = getManager().getRepository(User);

    try {
      let startTime = new Date().getTime();
      result = await userRepository.find();
      logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
    } catch (error) {
      logger.error(`Error At getAllUsers: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
    return result;
  }

  public async createUser(user: User) {
    const userRepository: Repository<User> = getManager().getRepository(User);
    let userSaved: any;
    try {
      let startTime = new Date().getTime();
      if (await userRepository.findOne({ email: user.email })) {
        throw ERROR_MSG.EMAIL_ALREADY_EXIST;
      } else {
        userSaved = await userRepository.save(user);
      }
      await userRepository.save(user);
      logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
    } catch (error) {
      logger.error(`Error At getAllUsers: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
    return userSaved;
  }
}

export const userRepository = new UserRepository();
