import logger from "../config/logger.winston";
import { ERROR_MSG } from "../constants/user.constant";
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { User } from "../models/user";

class UserRepository {
  public async getAllUsers() {
    let result: any;

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
  public async getUserById(id: number) {
    const userRepository: Repository<User> = getManager().getRepository(User);
    try {
      logger.info(`Get User By Id :: ${id}`);
      let startTime = new Date().getTime();
      const user: User | undefined = await userRepository.findOne(id);
      if (user) {
        logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
        return user;
      } else {
        logger.error(`Error While retrieving User By Id`);
        throw ERROR_MSG.USER_NOT_FOUND_IN_DB_BY_ID;
      }
    } catch (error) {
      logger.error(`Error At getUserById: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
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
