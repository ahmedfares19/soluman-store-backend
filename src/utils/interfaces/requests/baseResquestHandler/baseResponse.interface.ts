import { statusCodes } from "../../../enums/statuscodes.enum";

export interface baseResponse {
    statusCode: statusCodes
    isSuccessful?: boolean,
    message?: string,
    data?: any,
    count?: number,
    totalCount?: number
}

export function buildResponse(statusCode: statusCodes, isSuccessful?: boolean, message?: string, data?: any, count?: number, totalCount?: number): baseResponse {
    return {
        statusCode,
        isSuccessful,
        message,
        data,
        count,
        totalCount
    }
}

