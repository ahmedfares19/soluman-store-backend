import { plainToClass } from "class-transformer";
import { request, Request ,Response} from "express";
import { langs } from "../../../enums/lang.enum";
import { statusCodes } from "../../../enums/statuscodes.enum";
import { getAuthTokenPayload } from "../../../helpers/tokens.helper";
import { Header, IHeader } from "./baseRequestHeader.req";
import { buildResponse } from "./baseResponse.interface";

export function requestHandler(req:Request , res:Response ,next:any){
    const requestHeaders:IHeader = plainToClass(Header , req.headers);
    
    res.locals.metadata = {
        lang : requestHeaders.lang || langs.en,
        skip:requestHeaders.skip || 0,
        take:requestHeaders.take || 10,
        accesstoken:requestHeaders.accesstoken || '',
    }
    next();
}

export function authUser(req:Request , res:Response ,next:any){
   try {
    const token = (req.headers.accesstoken as any);
    const isOkay = getAuthTokenPayload(token)
    if(isOkay)
        next()
   } catch (error) {
       res.status(statusCodes.unauthorized).send(buildResponse(
           statusCodes.unauthorized,
           false
       ))
   }
    
}