import { plainToClass, plainToClassFromExist } from "class-transformer";
import e from "express";
import User from "../DAL/models/user.model";
import { UserDAL } from "../DAL/user.DAL";
import { statusCodes } from "../utils/enums/statuscodes.enum";
import { userData } from "../utils/interfaces/data.interfaces/user/userData";
import { IHeader } from "../utils/interfaces/requests/baseResquestHandler/baseRequestHeader.req";
import { baseResponse, buildResponse } from "../utils/interfaces/requests/baseResquestHandler/baseResponse.interface";
import { CreateUserReq } from "../utils/interfaces/requests/createUser.Req";
import { login } from "../utils/interfaces/requests/loginAsUser.Req";
import { localize } from "../utils/localization/localizer";
import { mapToUser } from "../utils/mappers/toUser";

export default class UserController {
    constructor(private userDAL: UserDAL) { }




    public createUser = async (userModel: CreateUserReq, metaData: IHeader): Promise<baseResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.userDAL.createUser(userModel, metaData);
                if (result.id) {
                    resolve(buildResponse(
                        statusCodes.created,
                        true,
                        localize(metaData.lang, "USER_CREATED"),
                        result
                    ))
                }
                else
                    throw result
            } catch (error) {
                if(error.isEmailExists){
                    reject(buildResponse(
                        statusCodes.conflict,
                        false,
                        localize(metaData.lang, "SOMETHING_WENT_WRON"),
                        error
                    ))
                }else {
                    reject(buildResponse(
                        statusCodes.internal_server_error,
                        false,
                        localize(metaData.lang, "SOMETHING_WENT_WRON"),
                        error
                    ))
                }
                
            }
        })
    }
    public getUserDataByToken = async (token: string, metaData: IHeader): Promise<baseResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.userDAL.getUserDataByToken(token, metaData);
                if (result) {
                    
                    resolve(buildResponse(
                        statusCodes.found,
                        true,
                        localize(metaData.lang, "DATA_EXISTS"),
                        mapToUser(result ,userData)
                    ))
                } else
                    reject(buildResponse(
                        statusCodes.not_found,
                        false,
                        localize(metaData.lang, "DATA_NOT_EXIST"),
                        null
                    ))
            } catch (error) {
                reject(buildResponse(
                    statusCodes.internal_server_error,
                    false,
                    localize(metaData.lang, "SOMETHING_WENT_WRON"),
                    error
                ))
            }
        });
    }
    public loginAsUser = async (loginModel:login , metaData: IHeader):Promise<baseResponse> => {
        return new Promise(async(resolve, reject) => {
            try {
                const result = await this.userDAL.login(loginModel,metaData)
                if (result) {
                    resolve(buildResponse(
                        statusCodes.found,
                        true,
                        localize(metaData.lang, "DATA_EXISTS"),
                        mapToUser(result ,userData)
                    ))
                } else
                    reject(buildResponse(
                        statusCodes.not_found,
                        false,
                        localize(metaData.lang, "DATA_NOT_EXIST"),
                        null
                    ))
            } catch (error) {
                reject(buildResponse(
                        statusCodes.internal_server_error,
                        false,
                        localize(metaData.lang, "SOMETHING_WENT_WRON"),
                        error
                    ))
            }
        });
    }
    
    public logout = async (metaData: IHeader):Promise<baseResponse> => {
        return new Promise(async(resolve, reject) => {
            try {
                const result = await this.userDAL.logout(metaData);
                if(result){
                    resolve(buildResponse(
                        statusCodes.found,
                        true,
                        localize(metaData.lang, "DATA_EXISTS"),
                    ))
                } else {
                    reject(buildResponse(
                        statusCodes.not_found,
                        false,
                        localize(metaData.lang, "DATA_NOT_EXIST"),
                        null
                    ))
                }
            } catch (error) {
                reject(buildResponse(
                    statusCodes.internal_server_error,
                    false,
                    localize(metaData.lang, "SOMETHING_WENT_WRON"),
                    error
                ))
            }
        });
    }
}