import logger from "../config/logger.winston";
import { ERROR_MSG } from "../constants/user.constant";
import { getManager, Repository } from "typeorm";
import { Error } from "../models/error";

/**
 * Error message repository
 */
class ErrorRepository {
  /**
   * Gets error message
   * @param errorCode
   * @returns
   */
  public async getErrorMessage(code: string) {
    let result: any;
    try {
      let startTime = new Date().getTime();
      const errorRepository: Repository<Error> = getManager().getRepository(Error);
      result = await errorRepository.findOne({ errorCode: code });
      logger.info(`Time Taken  For DB Operation :: ${new Date().getTime() - startTime} ms`);
    } catch (error) {
      logger.error(`Error At getErrorMessage: ${error}`);
      throw ERROR_MSG.SYSTEM_ERROR;
    }
    return result;
  }
}

export const errorRepository = new ErrorRepository();
