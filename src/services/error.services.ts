import { errorRepository } from "../repository/error.repository";
import { IErrorInfo, IUIError, IUIErrorInfos, IUIErrorInfo } from "../response/general";
import logger from "../config/logger.winston";
import { ERROR_MSG } from "../constants/user.constant";
import * as _ from "lodash";

/**
 * Error service
 */
class ErrorService {
  /**
   * Gets uierror
   * @param errorMsg
   * @returns
   */
  public async getUIError(errorMsg: string) {
    let uIErrorInfos: IUIErrorInfos = {} as IUIErrorInfos;
    let uIErrorInfo: IUIErrorInfo = {} as IUIErrorInfo;
    let uIError: IUIError = {} as IUIError;
    let uiErrorArray: IUIErrorInfo[] = [];

    try {
      let errorInfo = await this.getErrorMessages(errorMsg);
      if (errorInfo != null && errorInfo.errorMessage != null && errorInfo.httpStatusCode != null) {
        uIErrorInfo.errorCode = errorInfo.errorCode;
        uIErrorInfo.errorMessage = errorInfo.errorMessage;
        uiErrorArray.push(uIErrorInfo);
        uIError.errors = uiErrorArray;
        uIErrorInfos.httpStatusCode = errorInfo.httpStatusCode;
        uIErrorInfos.errorInfos = uIError;
      } else {
        logger.info(`No Error Message Found In DB : ${errorMsg}`);
        uIErrorInfo.errorCode = ERROR_MSG.SYSTEM_ERROR;
        uIErrorInfo.errorMessage = ERROR_MSG.DATABASE_ERROR_MESSAGE;
        uiErrorArray.push(uIErrorInfo);
        uIError.errors = uiErrorArray;
        uIErrorInfos.httpStatusCode = 500;
        uIErrorInfos.errorInfos = uIError;
      }
    } catch (error) {
      logger.info(`Unknown Exception Happened : ${error}`);
      uIErrorInfo.errorCode = ERROR_MSG.SYSTEM_ERROR;
      uIErrorInfo.errorMessage = ERROR_MSG.DATABASE_ERROR_MESSAGE;
      uiErrorArray.push(uIErrorInfo);
      uIError.errors = uiErrorArray;
      uIErrorInfos.httpStatusCode = 500;
      uIErrorInfos.errorInfos = uIError;
    }
    return uIErrorInfos;
  }

  /**
   * Gets error messages
   * @param error
   * @returns error messages
   */
  private async getErrorMessages(errorMsg: string) {
    let errorInfo: IErrorInfo = {} as IErrorInfo;
    try {
      let result = await errorRepository.getErrorMessage(errorMsg);
      if (!_.isEmpty(result)) {
        errorInfo = JSON.parse(JSON.stringify(result));
      }
    } catch (error) {
      logger.error(`Error At getErrorMessages : ${error}`);
    }
    return errorInfo;
  }
}

export const errorService = new ErrorService();
