import logger from "../config/logger.winston";
import { ERROR_MSG } from "../constants/user.constant";
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { User } from "../models/user";

class UserRepository {
  public async getAllUsers() {
    let result: any;

    const userRepository: Repository<User> = getManager().getRepository(User);

    try {
      const startTime = new Date().getTime();
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
      const startTime = new Date().getTime();
      const user: User | undefined = await userRepository.findOne(id);
      if (user) {
        logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
        return user;
      } else {
        logger.error("Error While retrieving User By Id");
        throw ERROR_MSG.USER_NOT_FOUND_IN_DB_BY_ID;
      }
    } catch (error) {
      logger.error(`Error At getUserById: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
  }
  public async createUser(user: User) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    try {
      const startTime = new Date().getTime();
      if (await userRepository.findOne({ email: user.email })) {
        throw ERROR_MSG.EMAIL_ALREADY_EXIST;
      } else {
        await userRepository.save(user);
      }
      await userRepository.save(user);
      logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
    } catch (error) {
      logger.error(`Error At getAllUsers: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
  }
  public async updateUser(user: User) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    try {
      const startTime = new Date().getTime();
      // check if a user with the specified id exists
      if (!(await userRepository.findOne(user.id))) {
        throw ERROR_MSG.USER_DOES_NOT_EXIST_BY_ID;
      } else if (await userRepository.findOne({ id: Not(Equal(user.id)), email: user.email })) {
        throw ERROR_MSG.USER_DOES_NOT_EXIST_BY_ID_AND_EMAIL;
      } else {
        await userRepository.save(user);
      }
      logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
    } catch (error) {
      logger.error(`Error At updateUser: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
  }

  public async deleteUser(id: number) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    try {
      const startTime = new Date().getTime();
      // check if a user with the specified id exists
      const userToRemove: User | undefined = await userRepository.findOne(id || 0);
      if (!userToRemove) {
        throw ERROR_MSG.USER_DOES_NOT_EXIST_BY_ID;
      } else {
        await userRepository.remove(userToRemove);
      }
      logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
    } catch (error) {
      logger.error(`Error At updateUser: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
  }
}

export const userRepository = new UserRepository();
