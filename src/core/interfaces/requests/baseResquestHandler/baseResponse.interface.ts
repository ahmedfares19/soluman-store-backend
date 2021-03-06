import { statusCodes } from "../../../../core/enums/statuscodes.enum";

export interface baseResponse {
  body: {
    isSuccessful?: boolean;
    message?: string;
    data?: any;
    count?: number;
    totalCount?: number;
  };
  statusCode: statusCodes;
}

export function buildResponse(
  statusCode: statusCodes,
  message?: string,
  data?: any,
  count?: number,
  totalCount?: number
): baseResponse {
  return {
    body: {  message, data, count, totalCount },
    statusCode:statusCode
  };
}
