import { plainToClass } from "class-transformer";
import { request, Request, Response } from "express";
import { langs } from "../../../../core/enums/lang.enum";
import { statusCodes } from "../../../../core/enums/statuscodes.enum";
import { buildResponse } from "./baseResponse.interface";
import { getAuthTokenPayload } from "../../../../utils/helpers/tokens.helper";
import { IContext } from "../../general/context.interface";
import short from "short-uuid";
import { localize } from "../../../../utils/localization/localizer";
export function requestHandler(req: Request, res: Response, next: any) {
  const context: IContext = {
    lang: (req.headers.lang as any) || langs.en,
    timestampFormated: new Date().toLocaleString(`en-US`),
    timestamp: new Date(),
    sessionId: short.generate(),
  };
  req["context"] = context;
  next();
}

export function authUser(req: Request, res: Response, next: any) {
  try {
    const token = req.headers.token as any;
    const payload = getAuthTokenPayload(token);
    if (payload) {
      //  setting request context
      const context: IContext = {
        lang: (req.headers.lang as any) || langs.en,
        token:token,
        id: payload.id as any,
        timestampFormated: new Date().toLocaleString(`en-US`),
        timestamp: new Date(),
        sessionId: short.generate(),
      };
      req["context"] = context;
      next();
    } else {
      res
        .status(statusCodes.unauthorized)
        .send(buildResponse(statusCodes.unauthorized,localize("Access_Denied",req["context"].lang)).body);
    }
  } catch (error) {
    res
      .status(statusCodes.internal_server_error)
      .send(buildResponse(statusCodes.internal_server_error,localize("Something_Went_Wrong",req["context"].lang)).body);
  }
}
