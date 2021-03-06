import joi from 'joi';
import User from "../DAL/models/user.model";
import { UserDAL } from "../DAL/user.DAL";
import { statusCodes } from "../core/enums/statuscodes.enum";
import { userData } from "../core/interfaces/data.interfaces/user/userData";
import { IHeader } from "../core/interfaces/requests/baseResquestHandler/baseRequestHeader.req";
import {
  baseResponse,
  buildResponse,
} from "../core/interfaces/requests/baseResquestHandler/baseResponse.interface";
import { login } from "../core/interfaces/requests/loginAsUser.Req";
import { localize } from "../utils/localization/localizer";
import { mapToUser } from "../core/mappers/toUser";
import { IUser } from "../DAL/models/user.model";
import httpContext from "express-http-context";
import { IContext } from "../core/interfaces/general/context.interface";
import { generateAuthToken } from '../utils/helpers/tokens.helper';
import logger from '../utils/logs/logger';
import { checkEncryptedPassword, encryptPassword } from '../utils/helpers/password.helper';

export default class UserController {
  constructor(private userDAL: UserDAL) {}

  public createUser = async (userDate:any ,context:IContext  ): Promise<baseResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser: IUser = new User(userDate);
        //validate phone and mail
        const isEmailExists = await this.userDAL.isMailExits(newUser.email);
        if(isEmailExists){
          resolve(buildResponse(statusCodes.conflict , localize("Email_Alreadt_Exists")));
        }
        const isPhoneExists = await this.userDAL.isPhoneExists(newUser.phone);
        if(isPhoneExists){
          resolve(buildResponse(statusCodes.conflict , localize("Phone_Alreadt_Exists")));
        }
        // generate new token
        newUser.token = generateAuthToken(newUser._id);
        // hashing password before saving inro database
        newUser.password = await encryptPassword(newUser.password)
        //save user to database
        const createdUser:IUser = await this.userDAL.create(newUser);
        //send response to router
        resolve(buildResponse(statusCodes.created, localize("New_User_Has_Been_Created",context.lang ), createdUser));
      } catch (error) {
        reject(buildResponse( statusCodes.internal_server_error, localize("Something_Went_Wrong",context.lang ), error.message ));
      }
    });
  };

  public loginAsUser = async (loginData:any,context:IContext):Promise<baseResponse> => {
    return new Promise(async(resolve, reject) => {
      try {
        let matchedUsers:IUser[] = [];
        if(loginData.phone)
           matchedUsers =await  this.userDAL.find({phone:loginData.phone})
        else if(loginData.email)
           matchedUsers =await  this.userDAL.find({email:loginData.email})
        else if(loginData.username)
           matchedUsers =await  this.userDAL.find({username:loginData.username})
        
        if(matchedUsers.length === 0){
          resolve(buildResponse( statusCodes.not_found, localize("No_User_Found",context.lang )));
        } else {
          const selectedUser = matchedUsers[0]
          const isCorrectPassword = await checkEncryptedPassword(selectedUser.password || "solimain" , loginData.password)
          if(isCorrectPassword){
            const newToken = generateAuthToken(selectedUser._id);
            selectedUser.token = newToken;
            await this.userDAL.update(selectedUser._id,selectedUser)
            resolve(buildResponse( statusCodes.found,undefined,  selectedUser));
          } else {
            resolve(buildResponse( statusCodes.not_found, localize("Wrong_Password",context.lang )));
          }
      
        }
      } catch (error) {
        reject(buildResponse( statusCodes.internal_server_error, localize("Something_Went_Wrong",context.lang ), error.message ));
      }
    });
  }
  public logout = async (metaData: IHeader): Promise<baseResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.userDAL.logout(metaData);
        if (result) {
          
        } else {
          
        }
      } catch (error) {
     
      }
    });
  };
  public updateUser = async (userNewData:any,context:IContext):Promise<baseResponse> => {
    return new Promise(async(resolve, reject) => {
      try {
        const _id =context.id || "";
        delete userNewData._id;
        if(userNewData.password)
          userNewData.password = await encryptPassword(userNewData.password)
        await this.userDAL.update(_id,userNewData);
        resolve(buildResponse(statusCodes.success, localize("Data_Has_Been_Updated",context.lang )));
      } catch (error) {
        reject(buildResponse( statusCodes.internal_server_error, localize("Something_Went_Wrong",context.lang ), error.message ));
      }
    });
  }
}
