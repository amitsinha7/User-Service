export interface IErrorInfo {
  errorCode: string;
  errorMessage: string;
  httpStatusCode: number;
  severity: string;
  businessContext: string;
  compensationInfo: string;
  errorReference: string;
}

export interface IErrorInfo {
  errorCode: string;
  errorMessage: string;
  httpStatusCode: number;
  severity: string;
  businessContext: string;
  compensationInfo: string;
  errorReference: string;
}

export interface IUIErrorInfos {
  httpStatusCode: number;
  errorInfos: IUIError;
}
export interface IUIError {
  errors: IUIErrorInfo[];
  connectionType: string;
}
export interface IUIErrorInfo {
  errorCode: string;
  errorMessage: string;
}
