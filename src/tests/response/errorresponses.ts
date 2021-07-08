export class ErrorResponses {
  public static readonly SYSTEM_ERROR_HTTP = {
    httpStatusCode: 200,
    errorInfos: {
      errors: [
        {
          errorCode: "9011000",
          errorMessage: "Unfortunately, we experienced some technical difficulties while processing your request. Please contact the system administrator."
        }
      ]
    }
  };
  public static readonly SYSTEM_ERROR = {
    errors: [
      {
        errorCode: "9011000",
        errorMessage: "Unfortunately, we experienced some technical difficulties while processing your request. Please contact the system administrator."
      }
    ]
  };
}
